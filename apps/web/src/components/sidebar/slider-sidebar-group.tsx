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
  title: string;
  min: number;
  max: number;
  step: number;
  minParamName: string;
  maxParamName: string;
  values: {
    [key: string]: number | undefined;
  };
};

export function SliderSidebarGroup({
  title,
  min,
  max,
  step,
  minParamName,
  maxParamName,
  values,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [low, setLow] = useState(values[minParamName] ?? min);
  const [high, setHigh] = useState(values[maxParamName] ?? max);

  const [lowInputValue, setLowInputValue] = useState("");
  const [highInputValue, setHighInputValue] = useState("");

  useEffect(() => {
    setLow(values[minParamName] ?? min);
    setHigh(values[maxParamName] ?? max);
  }, [values, min, max, minParamName, maxParamName]);

  useEffect(() => {
    if (low === min) {
      setLowInputValue("");
    } else {
      setLowInputValue(low.toString());
    }
    if (high === max) {
      setHighInputValue("");
    } else {
      setHighInputValue(high.toString());
    }
  }, [low, high, min, max]);

  function handleSliderChange(value: number[]) {
    setLow(value[0]);
    setHigh(value[1]);
  }

  function handleSubmit() {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete(minParamName);
    params.delete(maxParamName);
    if (lowInputValue !== "") {
      params.set(minParamName, lowInputValue);
    }
    if (highInputValue !== "") {
      params.set(maxParamName, highInputValue);
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
          <SidebarGroupContent className="flex flex-col justify-center gap-4 p-4">
            <Slider
              value={[low, high]}
              min={min}
              max={max}
              step={step}
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
