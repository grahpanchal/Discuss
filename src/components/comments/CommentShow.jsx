import { fetchCommentByPostId } from "@/lib/query/comment";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentCreateForm from "./CommentCreateForm";

const CommentShow = async ({ postId, commentId }) => {
  const comments = await fetchCommentByPostId(postId);

  const comment = comments.find((comment) => comment.id === commentId);
  if (!comment) return null;

  const children = comments.filter((c) => c.parentId === commentId);
  return (
    <div className="m-4 p-4 border">
      <div className="flex flex-col gap-2">
        <Avatar>
          <AvatarImage src={comment.user.image || ""} alt="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <p className="text-gray-500 text-sm font-medium">
            {comment.user.name}
          </p>
          <p className="text-gray-800">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
        {children.map((comment) => (
          <CommentShow
            key={comment.id}
            postId={postId}
            commentId={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentShow;
