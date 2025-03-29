"use client";

import React, { useEffect, useState } from "react";
import { DevicesQuerySchemaType } from "@retrolist/shared";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  sortBy: DevicesQuerySchemaType["sort_by"];
  order: DevicesQuerySchemaType["order"];
};

type SortOption = {
  label: string;
  sortBy: DevicesQuerySchemaType["sort_by"];
  order: DevicesQuerySchemaType["order"];
};

const sortOptions: SortOption[] = [
  { label: "Alphabetically, A-Z", sortBy: "device_name", order: "asc" },
  { label: "Alphabetically, Z-A", sortBy: "device_name", order: "desc" },
  { label: "Price (highest)", sortBy: "price_low", order: "desc" },
  { label: "Price (lowest)", sortBy: "price_low", order: "asc" },
  { label: "Release date (latest)", sortBy: "release_date", order: "desc" },
  { label: "Release date (oldest)", sortBy: "release_date", order: "asc" },
  {
    label: "Screen size (largest)",
    sortBy: "screen_size_inches",
    order: "desc",
  },
  {
    label: "Screen size (smallest)",
    sortBy: "screen_size_inches",
    order: "asc",
  },
];

export function SortSelect({ sortBy, order }: Props) {
  const [sort, setSort] = useState<SortOption>();

  useEffect(() => {
    if (sortBy && order) {
      setSort(
        sortOptions.find(
          (option) => option.sortBy === sortBy && option.order === order
        )
      );
    }
  }, [sortBy, order]);

  const handleValueChange = (value: string) => {
    setSort(sortOptions.find((option) => option.label === value));
  };

  return (
    <Select onValueChange={handleValueChange} value={sort?.label}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option) => {
            return (
              <SelectItem key={option.label} value={option.label}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
