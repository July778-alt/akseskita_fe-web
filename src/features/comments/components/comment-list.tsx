"use client";

import React from "react";
import { format } from "date-fns";
import { UserCircle, Trash2 } from "lucide-react";
import { useCommentsQuery, useDeleteCommentMutation } from "../queries/comment-queries";
import { CommentForm } from "./comment-form";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/features/auth/store/use-auth-store";

interface CommentListProps {
  reportId: string;
}

export function CommentList({ reportId }: CommentListProps) {
  const { data: comments, isLoading } = useCommentsQuery(reportId);
  const deleteComment = useDeleteCommentMutation(reportId);
  const { user } = useAuthStore();

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-muted rounded-xl w-full" />;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Comments ({comments?.length || 0})</h3>

      <div className="pt-4 border-t">
        <CommentForm reportId={reportId} />
      </div>

      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-muted/30 rounded-xl border space-y-2 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UserCircle size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{comment.author_name}</p>
                      {["admin", "super_admin"].includes(comment.role) && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary hover:bg-primary/20">
                          {comment.role === "super_admin" ? "Super Admin" : "Admin"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(comment.created_at), "MMM d, yyyy 'at' HH:mm")}
                    </p>
                  </div>
                </div>
                {user?.id === comment.user_id && (
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this comment?")) {
                        deleteComment.mutate(comment.id);
                      }
                    }}
                    className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className="text-sm pl-10 text-foreground/90 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>


    </div>
  );
}
