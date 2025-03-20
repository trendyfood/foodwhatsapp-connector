import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Pencil, Trash2, Save, X, Image } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  popular: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const FoodManager = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<FoodItem>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    tags: [],
    popular: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch food items
        const { data: foodData, error: foodError } = await supabase
          .from('food_items')
          .select('*')
          .order('name');
        
        if (foodError) throw foodError;
        
        // Fetch categories
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (categoryError) throw categoryError;
        
        setFoods(foodData || []);
        setCategories(categoryData || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error loading data",
          description: error.message || "Could not load food items and categories",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      tags: [],
      popular: false
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

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setFormData({ ...formData, tags: tagsArray });
  };

  const handleEdit = (food: FoodItem) => {
    setFormData(food);
    setImagePreview(food.image);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    
    try {
      const { error } = await supabase
        .from('food_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setFoods(foods.filter(food => food.id !== id));
      
      toast({
        title: "Food item deleted",
        description: "The food item has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting food item",
        description: error.message || "Could not delete the food item",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || (!imageFile && !formData.image)) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and upload an image",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload new image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
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
      
      const foodData = {
        name: formData.name || '',
        description: formData.description || '',
        price: Number(formData.price || 0),
        image: imageUrl || '',
        category: formData.category || '',
        tags: formData.tags || [],
        popular: formData.popular || false
      };
      
      let result;
      
      if (isEditing && formData.id) {
        // Update existing food item
        result = await supabase
          .from('food_items')
          .update(foodData)
          .eq('id', formData.id);
      } else {
        // Insert new food item
        result = await supabase
          .from('food_items')
          .insert([foodData]);
      }
      
      if (result.error) throw result.error;
      
      // Refresh food list
      const { data: newData, error: fetchError } = await supabase
        .from('food_items')
        .select('*')
        .order('name');
      
      if (fetchError) throw fetchError;
      
      setFoods(newData || []);
      resetForm();
      
      toast({
        title: isEditing ? "Food item updated" : "Food item added",
        description: isEditing 
          ? "The food item has been updated successfully" 
          : "New food item has been added to the menu",
      });
    } catch (error: any) {
      toast({
        title: "Error saving food item",
        description: error.message || "Could not save the food item",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && foods.length === 0) {
    return <div className="flex justify-center p-8"><div className="w-8 h-8 border-2 border-food-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Food Item' : 'Add New Food Item'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Food item name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category || ''} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="spicy, vegan, gluten-free"
                  value={formData.tags?.join(', ') || ''}
                  onChange={handleTagsChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="popular" 
                  checked={formData.popular || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, popular: checked as boolean })}
                />
                <Label htmlFor="popular">Mark as popular</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the food item"
                  className="min-h-[120px]"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Food Image</Label>
                <div className="mt-1 flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="flex-1"
                    onChange={handleImageChange}
                  />
                  
                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded overflow-hidden border">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
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
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Food Item' : 'Add Food Item')}
            </Button>
          </div>
        </form>
      </Card>
      
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Food Items</h2>
          <p className="text-gray-500 text-sm">Manage your food menu</p>
        </div>
        
        <Separator />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price (₦)</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No food items found. Add your first item using the form above.
                  </TableCell>
                </TableRow>
              ) : (
                foods.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell>
                      {food.image ? (
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <img 
                            src={food.image} 
                            alt={food.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                          <Image className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{food.name}</TableCell>
                    <TableCell>₦{food.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {categories.find(cat => cat.id === food.category)?.name || food.category}
                    </TableCell>
                    <TableCell>{food.popular ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(food)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(food.id)}
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

export default FoodManager;
