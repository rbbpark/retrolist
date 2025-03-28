import { fetchDevices } from "@/lib/data";
import { DeviceCompactView, DeviceFullView } from "@retrolist/shared";
import React from "react";
import { DeviceCardFull } from "./device-card-full";

export async function DeviceGrid() {
  const response = await fetchDevices();

  if (response.data.length === 0) {
    return <div>No devices found</div>;
  }

  const isFullMode = "brand" in response.data[0];

  if (isFullMode) {
    const fullDevices = response.data as DeviceFullView[];
    return (
      <div className="flex flex-row flex-wrap gap-4">
        {fullDevices.map((device: DeviceFullView) => (
          <DeviceCardFull device={device} key={device.id} />
        ))}
      </div>
    );
  } else {
    // TODO compact mode
    const compactDevices = response.data as DeviceCompactView[];
  }

  // console.log(data);
  return <div>device-grid</div>;
}
