import React from "react";
import { Badge } from "@/components/ui/badge";

interface ControlBadgesProps {
  hasAnalogs?: boolean;
  hasDualAnalogs?: boolean;
  hasHallAnalogs?: boolean;
  hasL3R3?: boolean;
  hasL2R2?: boolean;
  hasAnalogTriggers?: boolean;
  hasShoulderButtons?: boolean;
  className?: string;
}

export function ControlBadges({
  hasAnalogs,
  hasDualAnalogs,
  hasHallAnalogs,
  hasL3R3,
  hasL2R2,
  hasAnalogTriggers,
  hasShoulderButtons,
  className,
}: ControlBadgesProps) {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {hasAnalogs && <Badge variant="secondary">Analog</Badge>}
      {hasDualAnalogs && <Badge variant="secondary">Dual Analog</Badge>}
      {hasHallAnalogs && <Badge variant="secondary">Hall Effect</Badge>}
      {hasL3R3 && <Badge variant="secondary">L3/R3</Badge>}
      {hasL2R2 && <Badge variant="secondary">L2/R2</Badge>}
      {hasAnalogTriggers && <Badge variant="secondary">Analog Triggers</Badge>}
      {hasShoulderButtons && (
        <Badge variant="secondary">Shoulder Buttons</Badge>
      )}
    </div>
  );
}
