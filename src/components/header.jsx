import React, { Suspense } from "react";
import { Input } from "./ui/input";
import AuthHeader from "./auth-header";
import Link from "next/link";
import SearchInput from "./search-input";

const HeaderPage = async () => {
  return (
    <div className="grid grid-cols-3 h-14 items-center">
      <div className="flex justify-start">
        <Link href="/">
          <h1 className="font-bold text-xl">Discuss</h1>
        </Link>
      </div>
      <div className="flex justify-center">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="flex justify-end gap-2">
        <AuthHeader />
      </div>
    </div>
  );
};

export default HeaderPage;
