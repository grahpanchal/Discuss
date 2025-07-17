// import React from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import Link from "next/link";
// import { Button } from "../ui/button";

// const PostList = async ({ fetchData, params = {} }) => {
//   const posts = await fetchData();
//   const slug = params?.slug;

//   console.log(posts);
//   console.log("Params:", params); // 👈 see if slug exists
//   console.log("Slug:", slug);
//   console.log("Posts:", posts);

//   return (
//     <div className="flex flex-col gap-2">
//       {posts.map((post) => (
//         <Card key={post.id} className="cursor-pointer">
//           <CardHeader>
//             <CardTitle>{post.title}</CardTitle>
//             <CardDescription className="flex items-center justify-between">
//               <h1>By {post.user.name}</h1>
//               <h1>{post._count.comments} comments</h1>
//               <Link href={`/topics/${post.topic.slug}/posts/${post.id}`}>
//                 <Button variant={"link"} className="cursor-pointer">
//                   View
//                 </Button>
//               </Link>
//             </CardDescription>
//           </CardHeader>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default PostList;

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const PostList = async ({ fetchData, params = {} }) => {
  const posts = await fetchData();
  const slug = params?.slug;

  console.log("PostList - Posts:", posts);
  console.log("PostList - Params:", params);
  console.log("PostList - Slug:", slug);

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Card key={post.id} className="cursor-pointer">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <h1>By {post.user.name}</h1>
              <h1>{post._count.comments} comments</h1>
              <Link href={`/topics/${post.topic.slug}`}>
                <Button variant={"link"} className="cursor-pointer">
                  View
                </Button>
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
