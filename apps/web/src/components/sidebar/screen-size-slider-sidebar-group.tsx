"use client";

import React from "react";
import { SliderSidebarGroup } from "./slider-sidebar-group";

type Props = {
  screenSizes: {
    min_screen_size?: number;
    max_screen_size?: number;
  };
};

export function ScreenSizeSliderSidebarGroup({ screenSizes }: Props) {
  return (
    <SliderSidebarGroup
      title="Screen Size (in)"
      min={0}
      max={10.5}
      step={0.5}
      minParamName="min_screen_size"
      maxParamName="max_screen_size"
      values={screenSizes}
    />
  );
}
