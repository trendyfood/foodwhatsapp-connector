
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Category, CategoryFormData } from './types';

export const useCategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CategoryFormData>({
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

  return {
    categories,
    loading,
    submitting,
    isEditing,
    formData,
    setFormData,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete
  };
};
