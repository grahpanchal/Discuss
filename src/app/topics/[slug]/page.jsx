import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostByTopicSlug } from "@/lib/query/post";
import React from "react";

const TopicShowPage = async ({ params }) => {
  const slug = (await params).slug;
  console.log(slug);
  console.log("TopicShowPage - Slug:", slug); // Debug log
  console.log("TopicShowPage - Params:", params);
  const posts = await fetchPostByTopicSlug(params.slug);
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl font-bold m-2">Topic: {params.slug}</h1>
        <PostList posts={posts} /> {/* ✅ pass only data, not function */}
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
};

export default TopicShowPage;
