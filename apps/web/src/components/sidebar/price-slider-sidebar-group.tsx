"use client";

import React from "react";
import { SliderSidebarGroup } from "./slider-sidebar-group";

type Props = {
  prices: {
    min_price?: number;
    max_price?: number;
  };
};

export function PriceSliderSidebarGroup({ prices }: Props) {
  return (
    <SliderSidebarGroup
      title="Price (USD)"
      min={0}
      max={550}
      step={50}
      minParamName="min_price"
      maxParamName="max_price"
      values={prices}
    />
  );
}
