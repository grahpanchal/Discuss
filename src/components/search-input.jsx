// "use client";
// import React from "react";
// import { Input } from "./ui/input";
// import { useSearchParams } from "next/navigation";
// import { search } from "@/actions/search";

// const SearchInput = () => {
//   const searchParams = useSearchParams();
//   return (
//     <form action={search}>
//       <Input
//         type="text"
//         placeholder="Search Post..."
//         defaultValue={searchParams.get("term") || ""}
//       />
//     </form>
//   );
// };

// export default SearchInput;

// components/search-input.jsx
"use client";
import React, { useTransition } from "react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { search } from "@/actions/search";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = e.target.elements.term.value;
    startTransition(() => {
      search(new FormData(e.target));
    });
  };

  return (
    <form onSubmit={handleSubmit} action={search}>
      <Input
        name="term"
        type="text"
        placeholder="Search Post..."
        defaultValue={searchParams.get("term") || ""}
        disabled={isPending}
      />
    </form>
  );
};

export default SearchInput;
