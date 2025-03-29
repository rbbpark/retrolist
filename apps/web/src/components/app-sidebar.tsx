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
        <RadioFilterSidebarGroup
          title="Resolution"
          id="resolution"
          options={[
            "2560 x 1600",
            "1920 x 1200",
            "1920 x 1080",
            "1280 x 720",
            "640 x 480",
            "320 x 240",
            "480 x 320",
          ]}
          value={getFilterValue("resolution")}
        />
        <RadioFilterSidebarGroup
          title="Aspect Ratio"
          id="aspect_ratio"
          options={["4:3", "16:9", "16:10", "3:2", "1:1"]}
          value={getFilterValue("aspect_ratio")}
        />
        <RadioFilterSidebarGroup
          title="D-Pad Options"
          id="dpad_raw"
          options={DeviceSchema.shape.dpad_raw.options}
          value={getFilterValue("dpad_raw")}
        />
        <RadioFilterSidebarGroup
          title="Face Buttons"
          id="face_buttons"
          options={DeviceSchema.shape.face_buttons.options}
          value={getFilterValue("face_buttons")}
        />
        <RadioFilterSidebarGroup
          title="Shell Material"
          id="shell_material"
          options={DeviceSchema.shape.shell_material.options}
          value={getFilterValue("shell_material")}
        />
        <RadioFilterSidebarGroup
          title="Screen Type"
          id="screen_type"
          options={DeviceSchema.shape.screen_type.options}
          value={getFilterValue("screen_type")}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
