import { api, unwrap } from "@/lib/api";
import { Comment, CreateCommentDTO } from "@/types/comment";

export const CommentService = {
  async getCommentsByReportId(reportId: string): Promise<Comment[]> {
    const response = await api.get(`/reports/${reportId}/comments`);
    return unwrap(response);
  },

  async addComment(reportId: string, data: CreateCommentDTO): Promise<Comment> {
    const response = await api.post(`/reports/${reportId}/comments`, data);
    return unwrap(response);
  },

  async deleteComment(id: string): Promise<void> {
    await api.delete(`/comments/${id}`);
  },
};
