
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CategoryFormData } from './types';

interface CategoryFormProps {
  formData: CategoryFormData;
  setFormData: (data: CategoryFormData) => void;
  isEditing: boolean;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const CategoryForm = ({
  formData,
  setFormData,
  isEditing,
  submitting,
  onSubmit,
  onCancel
}: CategoryFormProps) => {
  return (
    <Card className="p-6">
      <form onSubmit={onSubmit}>
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
            onClick={onCancel}
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
  );
};

export default CategoryForm;
