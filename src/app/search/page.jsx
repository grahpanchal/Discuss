// import PostList from "@/components/posts/PostList";
// import { fetchPostBySearch } from "@/lib/query/post";
// import React from "react";

// const Search = async ({ searchParams }) => {
//   const term = (await searchParams).term;
//   return (
//     <div>
//       <h1 className="text-blue-600 font-medium italic">
//         Search Result for {term}
//       </h1>

//       <PostList fetchData={() => fetchPostBySearch(term)} />
//     </div>
//   );
// };

// export default Search;

// app/search/page.jsx
// app/search/page.jsx (updated)
"use server";
import { fetchPostsBySearchTerm } from "@/lib/query/post";
import PostList from "@/components/posts/PostList";
import TopicCreateForm from "@/components/topics/TopicCreateForm";

export default async function SearchPage({ searchParams }) {
  const term = searchParams.term;
  const posts = await fetchPostsBySearchTerm(term);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl font-bold m-2">
          Search Results for "{term || "No term provided"}"
        </h1>
        <PostList posts={posts} />
      </div>
      <div>
        <TopicCreateForm />
      </div>
    </div>
  );
}
