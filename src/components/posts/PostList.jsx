// import React from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import Link from "next/link";
// import { Button } from "../ui/button";

// const PostList = async ({ fetchData, params = {} }) => {
//   const posts = await fetchData();
//   const slug = params?.slug;

//   console.log("PostList - Posts:", posts);
//   console.log("PostList - Params:", params);
//   console.log("PostList - Slug:", slug);

//   return (
//     <div className="flex flex-col gap-2">
//       {posts.map((post) => (
//         <Card key={post.id} className="cursor-pointer">
//           <CardHeader>
//             <CardTitle>{post.title}</CardTitle>
//             <CardDescription className="flex items-center justify-between">
//               <h1>By {post.user.name}</h1>
//               <h1>{post._count.comments} comments</h1>
//               <div className="flex flex-col">
//                 <Link href={`/topics/${post.topic.slug}`}>
//                   <Button variant={"link"} className="cursor-pointer">
//                     Go To Topics
//                   </Button>
//                 </Link>
//                 <Link href={`/topics/${post.topic.slug}/posts/${post.id}`}>
//                   <Button variant={"link"} className="cursor-pointer">
//                     Go To Post
//                   </Button>
//                 </Link>
//               </div>
//             </CardDescription>
//           </CardHeader>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default PostList;

// "use client";
// import React, { useTransition, useState } from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { deletePost } from "@/actions/delete-post";

// const PostList = ({ posts: initialPosts }) => {
//   const [isPending, startTransition] = useTransition();
//   const [posts, setPosts] = useState(initialPosts);

//   const handleDelete = (postId) => {
//     startTransition(async () => {
//       try {
//         await deletePost(postId);
//         setPosts((prev) => prev.filter((p) => p.id !== postId));
//       } catch (error) {
//         console.error("Delete failed:", error.message);
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {posts.map((post) => (
//         <Card key={post.id} className="cursor-pointer">
//           <CardHeader>
//             <CardTitle>{post.title}</CardTitle>
//             <CardDescription className="flex items-center justify-between">
//               <h1>By {post.user.name}</h1>
//               <h1>{post._count.comments} comments</h1>
//               <div className="flex flex-col gap-1">
//                 <Link href={`/topics/${post.topic.slug}`}>
//                   <Button variant="link" className="cursor-pointer">
//                     Go To Topics
//                   </Button>
//                 </Link>
//                 <Link href={`/topics/${post.topic.slug}/posts/${post.id}`}>
//                   <Button variant="link" className="cursor-pointer">
//                     Go To Post
//                   </Button>
//                 </Link>
//                 <Button
//                   onClick={() => handleDelete(post.id)}
//                   variant="secondary"
//                   disabled={isPending}
//                   className="cursor-pointer"
//                 >
//                   {isPending ? "Deleting..." : "Delete"}
//                 </Button>
//               </div>
//             </CardDescription>
//           </CardHeader>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default PostList;

"use client";
import React, { useTransition, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { deletePost } from "@/actions/delete-post";
import { toast } from "react-hot-toast"; // Or your preferred toast library

const PostList = ({ posts: initialPosts }) => {
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState(initialPosts);

  const handleDelete = (postId) => {
    startTransition(async () => {
      try {
        await deletePost(postId);
        setPosts((prev) => prev.filter((p) => p.id !== postId));
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error.message);
        toast.error(error.message || "Failed to delete post");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Card key={post.id} className="cursor-pointer">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <h1>By {post.user.name}</h1>
              <h1>{post._count.comments} comments</h1>
              <div className="flex flex-col gap-1">
                <Link href={`/topics/${post.topic.slug}`}>
                  <Button variant="link" className="cursor-pointer">
                    Go To Topics
                  </Button>
                </Link>
                <Link href={`/topics/${post.topic.slug}/posts/${post.id}`}>
                  <Button variant="link" className="cursor-pointer">
                    Go To Post
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(post.id)}
                  variant="secondary"
                  disabled={isPending}
                  className="cursor-pointer"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
