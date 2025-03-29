"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "../ui/sidebar";
import { ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Props = {
  title: string;
  id: string;
  options: string[];
  value?: string;
};

export function RadioFilterSidebarGroup({
  title,
  id,
  options,
  value = "none",
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleValueChange(value: string) {
    // update URL
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value === "none") {
      params.delete(id);
    } else {
      params.set(id, value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Collapsible title={id} defaultOpen={false} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
        >
          <CollapsibleTrigger>
            {title}{" "}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent>
            <RadioGroup
              className="m-2"
              defaultValue={value}
              onValueChange={handleValueChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"none"} id={"none"} />
                <Label htmlFor={"none"}>{"None"}</Label>
              </div>
              {options.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
