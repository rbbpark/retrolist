"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RadioFilterSidebarGroup } from "./sidebar/radio-filter-sidebar-group";
import { DeviceSchema, FilterField } from "@retrolist/shared";
import { CheckboxFilterSidebarGroup } from "./sidebar/checkbox-filter-sidebar-group";
import Link from "next/link";
import { Button } from "./ui/button";
import { PriceSliderSidebarGroup } from "./sidebar/price-slider-sidebar-group";
import { ScreenSizeSliderSidebarGroup } from "./sidebar/screen-size-slider-sidebar-group";

export function AppSidebar({
  filters,
}: {
  filters: FilterField<string | number | boolean>[];
}) {
  function getFilterValue(id: string): string | undefined {
    const filter = filters.find((filter) => filter.name === id);
    return filter ? filter.value.toString() : undefined;
  }

  function getFilterBooleanValue(id: string): boolean {
    const filter = filters.find((filter) => filter.name === id);
    if (filter && typeof filter.value === "boolean") {
      return filter.value;
    }
    return false;
  }

  function getPriceRangeValues(): {
    min_price?: number;
    max_price?: number;
  } {
    const result: { min_price?: number; max_price?: number } = {};
    filters.map((filter) => {
      if (typeof filter.value === "number" && filter.name === "price_low") {
        if (filter.operator === "gte") {
          result.min_price = filter.value;
        }
        if (filter.operator === "lte") {
          result.max_price = filter.value;
        }
      }
    });
    return result;
  }

  function getScreenSizeRangeValues(): {
    min_screen_size?: number;
    max_screen_size?: number;
  } {
    const result: { min_screen_size?: number; max_screen_size?: number } = {};
    filters.map((filter) => {
      if (
        typeof filter.value === "number" &&
        filter.name === "screen_size_inches"
      ) {
        if (filter.operator === "gte") {
          result.min_screen_size = filter.value;
        }
        if (filter.operator === "lte") {
          result.max_screen_size = filter.value;
        }
      }
    });
    return result;
  }

  const controlOptions: CheckboxFilterOption[] = [
    {
      id: "has_analogs",
      title: "Analog Joysticks",
      value: getFilterBooleanValue("has_analogs"),
    },
    {
      id: "has_analog_triggers",
      title: "Analog Triggers",
      value: getFilterBooleanValue("has_analog_triggers"),
    },
    {
      id: "has_l2_r2",
      title: "L2 + R2",
      value: getFilterBooleanValue("has_l2_r2"),
    },
    {
      id: "has_shoulder_buttons",
      title: "Shoulder Buttons",
      value: getFilterBooleanValue("has_shoulder_buttons"),
    },
    {
      id: "has_rumble",
      title: "Rumble",
      value: getFilterBooleanValue("has_rumble"),
    },
  ];

  const deviceOptions: CheckboxFilterOption[] = [
    {
      id: "has_dual_external_sd",
      title: "Dual External SD",
      value: getFilterBooleanValue("has_dual_external_sd"),
    },
    {
      id: "has_video_output",
      title: "Video Output",
      value: getFilterBooleanValue("has_video_output"),
    },
    {
      id: "has_audio_output",
      title: "Audio Output",
      value: getFilterBooleanValue("has_audio_output"),
    },
  ];

  const connectivityOptions: CheckboxFilterOption[] = [
    {
      id: "has_wifi",
      title: "WiFi",
      value: getFilterBooleanValue("has_wifi"),
    },
    {
      id: "has_usb_otg",
      title: "USB OTG",
      value: getFilterBooleanValue("has_usb_otg"),
    },
    {
      id: "has_bt",
      title: "Bluetooth",
      value: getFilterBooleanValue("has_bt"),
    },
    {
      id: "has_lte",
      title: "LTE",
      value: getFilterBooleanValue("has_lte"),
    },

    {
      id: "has_thunderbolt",
      title: "Thunderbolt",
      value: getFilterBooleanValue("has_thunderbolt"),
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b-1"></SidebarHeader>
      <SidebarContent className="gap-0 pb-32">
        <PriceSliderSidebarGroup prices={getPriceRangeValues()} />
        <ScreenSizeSliderSidebarGroup
          screenSizes={getScreenSizeRangeValues()}
        />

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

        <CheckboxFilterSidebarGroup title="Controls" options={controlOptions} />
        <CheckboxFilterSidebarGroup title="Device" options={deviceOptions} />
        <CheckboxFilterSidebarGroup
          title="Connectivity"
          options={connectivityOptions}
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
      {filters.length > 0 && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex justify-center">
              <Button>
                <Link href="/device">{`Reset filters (${filters.length})`}</Link>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}
