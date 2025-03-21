
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CategoryFormData extends Partial<Category> {}
