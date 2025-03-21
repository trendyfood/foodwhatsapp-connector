
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<Category>>({
    id: '',
    name: '',
    icon: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error loading categories",
        description: error.message || "Could not load categories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      icon: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (category: Category) => {
    console.log("Editing category:", category);
    setFormData({
      id: category.id,
      name: category.name,
      icon: category.icon
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCategories(categories.filter(category => category.id !== id));
      
      toast({
        title: "Category deleted",
        description: "The category has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting category",
        description: error.message || "Could not delete the category",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name || !formData.icon) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      const categoryData = {
        id: formData.id,
        name: formData.name,
        icon: formData.icon
      };
      
      let result;
      
      if (isEditing) {
        console.log("Updating category:", categoryData);
        // Update existing category
        result = await supabase
          .from('categories')
          .update({
            name: categoryData.name,
            icon: categoryData.icon
          })
          .eq('id', categoryData.id);
      } else {
        // Check if ID already exists
        const { data } = await supabase
          .from('categories')
          .select('id')
          .eq('id', formData.id)
          .single();
        
        if (data) {
          toast({
            title: "ID already exists",
            description: "Please use a different ID for the new category",
            variant: "destructive",
          });
          setSubmitting(false);
          return;
        }
        
        // Insert new category
        result = await supabase
          .from('categories')
          .insert([categoryData]);
      }
      
      if (result.error) throw result.error;
      
      await fetchCategories();
      resetForm();
      
      toast({
        title: isEditing ? "Category updated" : "Category added",
        description: isEditing 
          ? "The category has been updated successfully" 
          : "New category has been added",
      });
    } catch (error: any) {
      toast({
        title: "Error saving category",
        description: error.message || "Could not save the category",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && categories.length === 0) {
    return <div className="flex justify-center p-8"><div className="w-8 h-8 border-2 border-food-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Category' : 'Add New Category'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="id">ID (used in code)</Label>
              <Input
                id="id"
                placeholder="burgers"
                value={formData.id || ''}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase() })}
                disabled={isEditing}
                required
              />
              {!isEditing && (
                <p className="text-xs text-gray-500 mt-1">
                  Use a simple identifier without spaces (e.g., "burgers", "pasta")
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                placeholder="Burgers"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="icon">Icon (emoji)</Label>
              <Input
                id="icon"
                placeholder="🍔"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
              />
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
              disabled={submitting}
            >
              {submitting ? 'Saving...' : (isEditing ? 'Update Category' : 'Add Category')}
            </Button>
          </div>
        </form>
      </Card>
      
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-gray-500 text-sm">Manage food categories</p>
        </div>
        
        <Separator />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No categories found. Add your first category using the form above.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-mono">{category.id}</TableCell>
                    <TableCell className="text-xl">{category.icon}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(category.id)}
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

export default CategoryManager;
