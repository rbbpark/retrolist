"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function SearchInput({ searchText }: { searchText?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchText ?? "");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // update URL
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="relative w-[400px]">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="w-full pl-9"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
}
