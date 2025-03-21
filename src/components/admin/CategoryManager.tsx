
import React from 'react';
import CategoryForm from './category/CategoryForm';
import CategoryList from './category/CategoryList';
import { useCategoryManager } from './category/useCategoryManager';

const CategoryManager = () => {
  const {
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
  } = useCategoryManager();

  return (
    <div className="space-y-6">
      <CategoryForm
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        submitting={submitting}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />
      
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default CategoryManager;
