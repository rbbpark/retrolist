import { fetchDevices } from "@/lib/data";
import { DeviceCompactView, DeviceFullView } from "@retrolist/shared";
import React from "react";
import { DeviceCardFull } from "./device-card-full";
import { AppPagination } from "../app-pagination";

export async function DeviceGrid({ queryString }: { queryString: string }) {
  const response = await fetchDevices(queryString);

  if (response.data.length === 0) {
    // TODO
    return <div>No devices found</div>;
  }

  const paginationData = {
    total: response.pagination.total,
    page: response.pagination.page,
    pageSize: response.pagination.page_size,
    pages: response.pagination.pages,
  };

  const isFullMode = "brand" in response.data[0];

  if (isFullMode) {
    const fullDevices = response.data as DeviceFullView[];
    return (
      <div className="flex flex-col">
        <div className="flex flex-grow flex-row flex-wrap gap-4">
          {fullDevices.map((device: DeviceFullView) => (
            <DeviceCardFull device={device} key={device.id} />
          ))}
        </div>
        <AppPagination
          className="my-4"
          page={paginationData.page}
          pages={paginationData.pages}
        />
      </div>
    );
  } else {
    // TODO compact mode
    const compactDevices = response.data as DeviceCompactView[];
  }

  return <div>device-grid</div>;
}
