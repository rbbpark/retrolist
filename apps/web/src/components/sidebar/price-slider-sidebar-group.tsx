"use client";

import React, { useState, useEffect } from "react";
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
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  prices: {
    min_price?: number;
    max_price?: number;
  };
};

export function PriceSliderSidebarGroup({ prices }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const MIN = 0;
  const MAX = 550;
  const STEPS = 50;

  const [low, setLow] = useState(prices.min_price ?? MIN);
  const [high, setHigh] = useState(prices.max_price ?? MAX);

  const [lowInputValue, setLowInputValue] = useState("");
  const [highInputValue, setHighInputValue] = useState("");

  useEffect(() => {
    setLow(prices.min_price ?? MIN);
    setHigh(prices.max_price ?? MAX);
  }, [prices]);

  useEffect(() => {
    if (low === MIN) {
      setLowInputValue("");
    } else {
      setLowInputValue(low.toString());
    }
    if (high === MAX) {
      setHighInputValue("");
    } else {
      setHighInputValue(high.toString());
    }
  }, [low, high]);

  function handleSliderChange(value: number[]) {
    setLow(value[0]);
    setHigh(value[1]);
  }

  function handleSubmit() {
    // update URL
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("min_price");
    params.delete("max_price");
    if (lowInputValue !== "") {
      params.set("min_price", lowInputValue);
    }
    if (highInputValue !== "") {
      params.set("max_price", highInputValue);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Collapsible
      title={"Prices"}
      defaultOpen={false}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
        >
          <CollapsibleTrigger>
            {"Prices"}{" "}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent className="flex flex-col justify-center gap-4 p-4">
            <Slider
              value={[low, high]}
              min={MIN}
              max={MAX}
              step={STEPS}
              minStepsBetweenThumbs={1}
              onValueChange={handleSliderChange}
            />
            <div className="flex flex-row gap-2">
              <Input
                type="number"
                placeholder="Low"
                value={lowInputValue}
                readOnly
              />
              <Input
                type="number"
                placeholder="High"
                value={highInputValue}
                readOnly
              />
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSubmit}>Apply</Button>
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
