import { fetchCommentByPostId } from "@/lib/query/comment";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentCreateForm from "./CommentCreateForm";

const CommentShow = async ({ commentId, postId }) => {
  const comments = await fetchCommentByPostId(postId);

  const comment = comments.find((comment) => comment.id === commentId);
  if (!comment) return notFound();

  const childrenCommnets = comments.filter(
    (comment) => comment.parentId === commentId
  );
  return (
    <div className="m-4 p-4 border">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={comment.user.image || ""} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <p className="text-gray-500 text-sm font-medium">
            {comment.user.name}
          </p>
          <p className="text-gray-800">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
        {childrenCommnets.map((comment) => {
          <CommentShow
            key={comment.id}
            commentId={comment.id}
            postId={postId}
          />;
        })}
      </div>
    </div>
  );
};

export default CommentShow;
