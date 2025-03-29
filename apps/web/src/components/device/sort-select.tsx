"use client";

import React from "react";
import { DevicesQuerySchemaType } from "@retrolist/shared";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type Props = {
  sortBy: DevicesQuerySchemaType["sort_by"];
  order: DevicesQuerySchemaType["order"];
};

type SortOption = {
  label: string;
  sortBy: NonNullable<DevicesQuerySchemaType["sort_by"]>;
  order: NonNullable<DevicesQuerySchemaType["order"]>;
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const initialSort = sortOptions.find(
    (option) => option.sortBy === sortBy && option.order === order
  );

  console.log(initialSort);

  const handleValueChange = (value: string) => {
    const selectedOption = sortOptions.find((option) => option.label === value);

    if (!selectedOption) {
      throw new Error("Selected option not found, this is unexpected");
    }

    // update URL
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("sort_by", selectedOption.sortBy);
    params.set("order", selectedOption.order);
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={handleValueChange}
      value={initialSort ? initialSort.label : ""}
    >
      <SelectTrigger className="w-[190px]">
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
