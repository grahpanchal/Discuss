import React from "react";
import CommentShow from "./CommentShow";
import { fetchCommentByPostId } from "@/lib/query/comment";

const CommentList = async ({ postId }) => {
  const comments = await fetchCommentByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  return (
    <div>
      <h1 className="font-bold text-lg">All Comments</h1>
      {topLevelComments.map((comment) => {
        return (
          <CommentShow
            key={comment.id}
            postId={comment.postId}
            commentId={comment.id}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
