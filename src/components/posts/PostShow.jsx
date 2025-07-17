import { prisma } from "@/lib";
import { notFound } from "next/navigation";
import React from "react";

const PostShow = async ({ postId }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (!post) return notFound();
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="border rounded p-3">{post.content}</p>
    </div>
  );
};

export default PostShow;
