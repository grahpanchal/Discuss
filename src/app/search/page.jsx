import PostList from "@/components/posts/PostList";
import { fetchPostBySearch } from "@/lib/query/post";
import React from "react";

const Search = async ({ searchParams }) => {
  const term = (await searchParams).term;
  return (
    <div>
      <h1 className="text-blue-600 font-medium italic">
        Search Result for {term}
      </h1>

      <PostList fetchData={() => fetchPostBySearch(term)} />
    </div>
  );
};

export default Search;
