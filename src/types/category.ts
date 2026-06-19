export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDTO {
  name: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
