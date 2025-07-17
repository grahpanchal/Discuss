import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import PostShow from "@/components/posts/PostShow";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const PostShowPage = async ({ params }) => {
  const { slug, postId } = await params;

  return (
    <div className="space-y-2">
      <Link href={`/topics/${slug}`} className="flex">
        <Button variant={"link"} className={"cursor-pointer"}>
          <ChevronLeft />
          Back To {slug}
        </Button>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
};

export default PostShowPage;
