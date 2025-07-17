import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const PostList = async ({ fetchData }) => {
  const posts = await fetchData();
  console.log(posts);

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <h1>By {post.user.name}</h1>
              <h1>{post._count.comments} comments</h1>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
