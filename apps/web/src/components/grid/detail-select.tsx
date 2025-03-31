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
import { Label } from "../ui/label";

type Props = {
  detail?: DevicesQuerySchemaType["detail"];
};

export function DetailSelect({ detail = "full" }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleValueChange = (value: string) => {
    // update URL
    const params = new URLSearchParams(searchParams);
    params.set("detail", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="detail">Detail: </Label>
      <Select onValueChange={handleValueChange} value={detail}>
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={"compact"} value={"compact"}>
              {"Compact"}
            </SelectItem>
            <SelectItem key={"full"} value={"full"}>
              {"Full"}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
