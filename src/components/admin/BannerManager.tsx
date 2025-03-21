
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Image, Eye, MoveUp, MoveDown } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BannerImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  active: boolean;
  slide_order: number;
}

const BannerManager = () => {
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [limitReached, setLimitReached] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<BannerImage>>({
    image_url: '',
    title: '',
    description: '',
    active: true,
    slide_order: 0
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banner_images')
        .select('*')
        .order('slide_order', { ascending: true });
      
      if (error) throw error;
      
      setBanners(data || []);
      setLimitReached(data && data.length >= 5);
    } catch (error: any) {
      console.error('Error fetching banners:', error);
      toast({
        title: "Error loading banners",
        description: error.message || "Could not load banner images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      description: '',
      active: true,
      slide_order: banners.length > 0 ? Math.max(...banners.map(banner => banner.slide_order || 0)) + 1 : 0
    });
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEdit = (banner: BannerImage) => {
    setFormData(banner);
    setImagePreview(banner.image_url);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this banner image?')) return;
    
    try {
      const { error } = await supabase
        .from('banner_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBanners(banners.filter(banner => banner.id !== id));
      setLimitReached(false);
      
      toast({
        title: "Banner deleted",
        description: "The banner image has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting banner",
        description: error.message || "Could not delete the banner",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('banner_images')
        .update({ active: !currentActive })
        .eq('id', id);
      
      if (error) throw error;
      
      setBanners(banners.map(banner => 
        banner.id === id ? { ...banner, active: !currentActive } : banner
      ));
      
      toast({
        title: currentActive ? "Banner deactivated" : "Banner activated",
        description: currentActive 
          ? "The banner image is now hidden from the site" 
          : "The banner image is now visible on the site",
      });
    } catch (error: any) {
      toast({
        title: "Error updating banner",
        description: error.message || "Could not update the banner status",
        variant: "destructive",
      });
    }
  };

  const handleMoveUp = async (banner: BannerImage, index: number) => {
    if (index <= 0) return;
    
    const prevBanner = banners[index - 1];
    const prevOrder = prevBanner.slide_order;
    const currentOrder = banner.slide_order;
    
    try {
      // Update the current banner with the previous banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: prevOrder })
        .eq('id', banner.id);
      
      // Update the previous banner with the current banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: currentOrder })
        .eq('id', prevBanner.id);
      
      // Update state
      const updatedBanners = [...banners];
      [updatedBanners[index - 1], updatedBanners[index]] = [updatedBanners[index], updatedBanners[index - 1]];
      setBanners(updatedBanners);
      
      toast({
        title: "Order updated",
        description: "Banner slide order has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error updating order",
        description: error.message || "Could not update the banner order",
        variant: "destructive",
      });
    }
  };

  const handleMoveDown = async (banner: BannerImage, index: number) => {
    if (index >= banners.length - 1) return;
    
    const nextBanner = banners[index + 1];
    const nextOrder = nextBanner.slide_order;
    const currentOrder = banner.slide_order;
    
    try {
      // Update the current banner with the next banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: nextOrder })
        .eq('id', banner.id);
      
      // Update the next banner with the current banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: currentOrder })
        .eq('id', nextBanner.id);
      
      // Update state
      const updatedBanners = [...banners];
      [updatedBanners[index], updatedBanners[index + 1]] = [updatedBanners[index + 1], updatedBanners[index]];
      setBanners(updatedBanners);
      
      toast({
        title: "Order updated",
        description: "Banner slide order has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error updating order",
        description: error.message || "Could not update the banner order",
        variant: "destructive",
      });
    }
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

  if (loading && banners.length === 0) {
    return <div className="flex justify-center p-8"><div className="w-8 h-8 border-2 border-food-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6">
      {limitReached && !isEditing && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription>
            Maximum banner limit (5) reached. Delete an existing banner before adding a new one.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="p-6">
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
      </Card>
      
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Banner Images</h2>
          <p className="text-gray-500 text-sm">Manage banner images for your homepage ({banners.length}/5)</p>
        </div>
        
        <Separator />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No banner images found. Add your first banner using the form above.
                  </TableCell>
                </TableRow>
              ) : (
                banners.map((banner, index) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      {banner.image_url ? (
                        <div className="w-16 h-12 rounded overflow-hidden">
                          <img 
                            src={banner.image_url} 
                            alt={banner.title || 'Banner'} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center">
                          <Image className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{banner.title || 'Untitled Banner'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${banner.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span>{banner.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{banner.slide_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={index === 0}
                          onClick={() => handleMoveUp(banner, index)}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={index === banners.length - 1}
                          onClick={() => handleMoveDown(banner, index)}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={banner.active ? 'text-orange-500' : 'text-green-500'}
                          onClick={() => handleToggleActive(banner.id, banner.active)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(banner)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(banner.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default BannerManager;
