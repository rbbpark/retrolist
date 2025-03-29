"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RadioFilterSidebarGroup } from "./sidebar/radio-filter-sidebar-group";
import { DeviceSchema, FilterField } from "@retrolist/shared";

export function AppSidebar({
  filters,
}: {
  filters: FilterField<string | number | boolean>[];
}) {
  function getFilterValue(id: string): string | undefined {
    const filter = filters.find((filter) => filter.name === id);
    return filter ? filter.value.toString() : undefined;
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b-1"></SidebarHeader>
      <SidebarContent className="gap-0">
        <RadioFilterSidebarGroup
          title="Form Factor"
          id="form_factor"
          options={DeviceSchema.shape.form_factor.options}
          value={getFilterValue("form_factor")}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
