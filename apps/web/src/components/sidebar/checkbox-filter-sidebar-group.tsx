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
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  title: string;
  options: CheckboxFilterOption[];
};

export function CheckboxFilterSidebarGroup({ title, options }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleCheckedChange(id: string, checked: CheckedState) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (checked === "indeterminate" || checked === false) {
      params.delete(id);
    } else if (checked === true) {
      params.set(id, "true");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Collapsible
      title={title}
      defaultOpen={false}
      className="group/collapsible"
    >
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
            {options.map((option) => (
              <div
                key={option.id}
                className="mx-2 my-3 flex items-center space-x-2"
              >
                <Checkbox
                  id={option.id}
                  checked={option.value}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(option.id, checked)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.title}
                </label>
              </div>
            ))}
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
