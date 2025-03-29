"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RadioFilterSidebarGroup } from "./sidebar/radio-filter-sidebar-group";
import { DeviceSchema } from "@retrolist/shared";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b-1"></SidebarHeader>
      <SidebarContent className="gap-0">
        <RadioFilterSidebarGroup
          title="Form Factor"
          id="form_factor"
          options={DeviceSchema.shape.form_factor.options}
          value=""
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
