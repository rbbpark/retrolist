import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CompatibilityBadgesProps {
  gbc?: number;
  nes?: number;
  genesis?: number;
  gba?: number;
  snes?: number;
  psx?: number;
  nds?: number;
  n64?: number;
  dreamcast?: number;
  psp?: number;
  saturn?: number;
  ngc?: number;
  wii?: number;
  n3ds?: number;
  ps2?: number;
  wiiu?: number;
  switch?: number;
  ps3?: number;
  className?: string;
}

const getCompatibilityColor = (rating: number) => {
  if (rating >= 4) return "bg-green-500";
  if (rating >= 3) return "bg-yellow-500";
  if (rating >= 2) return "bg-orange-500";
  return "bg-red-500";
};

export function CompatibilityBadges({
  gbc,
  nes,
  genesis,
  gba,
  snes,
  psx,
  nds,
  n64,
  dreamcast,
  psp,
  saturn,
  ngc,
  wii,
  n3ds,
  ps2,
  wiiu,
  switch: switchRating,
  ps3,
  className,
}: CompatibilityBadgesProps) {
  const compatibilityRatings = [
    { name: "GBC", rating: gbc },
    { name: "NES", rating: nes },
    { name: "Genesis", rating: genesis },
    { name: "GBA", rating: gba },
    { name: "SNES", rating: snes },
    { name: "PSX", rating: psx },
    { name: "NDS", rating: nds },
    { name: "N64", rating: n64 },
    { name: "Dreamcast", rating: dreamcast },
    { name: "PSP", rating: psp },
    { name: "Saturn", rating: saturn },
    { name: "NGC", rating: ngc },
    { name: "Wii", rating: wii },
    { name: "3DS", rating: n3ds },
    { name: "PS2", rating: ps2 },
    { name: "WiiU", rating: wiiu },
    { name: "Switch", rating: switchRating },
    { name: "PS3", rating: ps3 },
  ].filter(
    (item): item is { name: string; rating: number } =>
      typeof item.rating === "number" && item.rating > 0
  );

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      <TooltipProvider>
        {compatibilityRatings.map(({ name, rating }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Badge
                variant="secondary"
                className={`${getCompatibilityColor(rating)} text-white`}
              >
                {name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compatibility Rating: {rating}/5</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
