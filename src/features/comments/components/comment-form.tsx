"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddCommentMutation } from "../queries/comment-queries";
import { Loader2 } from "lucide-react";

interface CommentFormProps {
  reportId: string;
}

export function CommentForm({ reportId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const addComment = useAddCommentMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment.mutate(
      { reportId, data: { message: content } },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Add a comment to this report..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="resize-none"
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!content.trim() || addComment.isPending}
        >
          {addComment.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </form>
  );
}
