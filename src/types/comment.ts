export interface Comment {
  id: string;
  content: string;
  author_name: string;
  role: string;
  user_id: string;
  created_at: string;
}

export interface CreateCommentDTO {
  message: string;
}
