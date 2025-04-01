import React from "react";
import { Badge } from "@/components/ui/badge";

interface ConnectivityBadgesProps {
  hasWifi: boolean;
  hasBt: boolean;
  hasLte: boolean;
  hasUsbOtg: boolean;
  hasThunderbolt: boolean;
  hasVideoOutput: boolean;
  hasAudioOutput: boolean;
  hasDualExternalSD: boolean;
  className?: string;
}

export function ConnectivityBadges({
  hasWifi,
  hasBt,
  hasLte,
  hasUsbOtg,
  hasThunderbolt,
  hasVideoOutput,
  hasAudioOutput,
  hasDualExternalSD,
  className,
}: ConnectivityBadgesProps) {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {hasWifi && <Badge variant="secondary">Wi-Fi</Badge>}
      {hasBt && <Badge variant="secondary">Bluetooth</Badge>}
      {hasLte && <Badge variant="secondary">LTE</Badge>}
      {hasUsbOtg && <Badge variant="secondary">USB OTG</Badge>}
      {hasThunderbolt && <Badge variant="secondary">Thunderbolt</Badge>}
      {hasVideoOutput && <Badge variant="secondary">Video Output</Badge>}
      {hasAudioOutput && <Badge variant="secondary">Audio Output</Badge>}
      {hasDualExternalSD && <Badge variant="secondary">Dual External SD</Badge>}
    </div>
  );
}
