
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BannerImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  active: boolean;
  slide_order: number;
}

interface BannerFormProps {
  formData: Partial<BannerImage>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<BannerImage>>>;
  banners: BannerImage[];
  isEditing: boolean;
  resetForm: () => void;
  fetchBanners: () => Promise<void>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  limitReached: boolean;
}

const BannerForm: React.FC<BannerFormProps> = ({
  formData,
  setFormData,
  banners,
  isEditing,
  resetForm,
  fetchBanners,
  submitting,
  setSubmitting,
  limitReached
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(formData.image_url || '');
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile && !formData.image_url) {
      toast({
        title: "Missing image",
        description: "Please upload a banner image",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      let imageUrl = formData.image_url;
      
      // Upload new image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `banner-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('food_images')
          .upload(filePath, imageFile);
        
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('food_images')
          .getPublicUrl(filePath);
        
        imageUrl = data.publicUrl;
      }
      
      const bannerData = {
        ...formData,
        image_url: imageUrl,
        slide_order: formData.slide_order || banners.length
      };
      
      let result;
      
      if (isEditing && formData.id) {
        // Update existing banner
        result = await supabase
          .from('banner_images')
          .update(bannerData)
          .eq('id', formData.id);
      } else {
        // Insert new banner
        result = await supabase
          .from('banner_images')
          .insert([bannerData]);
      }
      
      if (result.error) throw result.error;
      
      await fetchBanners();
      resetForm();
      setImageFile(null);
      setImagePreview('');
      
      toast({
        title: isEditing ? "Banner updated" : "Banner added",
        description: isEditing 
          ? "The banner has been updated successfully" 
          : "New banner has been added to the site",
      });
    } catch (error: any) {
      // Check for banner limit error
      if (error.message && error.message.includes('Maximum banner limit')) {
        toast({
          title: "Banner limit reached",
          description: "You can only have a maximum of 5 banner images",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error saving banner",
          description: error.message || "Could not save the banner",
          variant: "destructive",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Banner' : 'Add New Banner'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Banner Image</Label>
          <div className="mt-1 flex flex-col gap-4">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            
            {imagePreview && (
              <div className="relative w-full max-w-md h-48 rounded overflow-hidden border">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              placeholder="Banner title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Switch
              id="active"
              checked={formData.active || false}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Show on website</Label>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            placeholder="Banner description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="slide_order">Slide Order</Label>
          <Input
            id="slide_order"
            type="number"
            min="0"
            placeholder="0"
            value={formData.slide_order || 0}
            onChange={(e) => setFormData({ ...formData, slide_order: parseInt(e.target.value) })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Lower numbers appear first in the slide show
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={resetForm}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-food-primary hover:bg-food-secondary"
          disabled={submitting || (limitReached && !isEditing)}
        >
          {submitting ? 'Saving...' : (isEditing ? 'Update Banner' : 'Add Banner')}
        </Button>
      </div>
    </form>
  );
};

export default BannerForm;
