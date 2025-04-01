import { fetchDevices } from "@/lib/data";
import { DeviceCompactView, DeviceFullView } from "@retrolist/shared";
import React from "react";
import { DeviceCardFull } from "../device/card/device-card-full";
import { DeviceCardCompact } from "../device/card/device-card-compact";
import { AppPagination } from "./app-pagination";

export async function DeviceGrid({ queryString }: { queryString: string }) {
  const response = await fetchDevices(queryString);
  const devices = response.data as DeviceFullView[];

  if (response.data.length === 0) {
    // TODO
    return (
      <div className="container mx-auto flex h-full w-full items-center justify-center">
        No devices found
      </div>
    );
  }

  const paginationData = {
    total: response.pagination.total,
    page: response.pagination.page,
    pageSize: response.pagination.page_size,
    pages: response.pagination.pages,
  };

  const isFullMode = "shell_material" in response.data[0];

  const content = isFullMode ? (
    <>
      {devices.map((device: DeviceFullView) => (
        <DeviceCardFull device={device} key={device.id} />
      ))}
    </>
  ) : (
    <>
      {devices.map((device: DeviceCompactView) => (
        <DeviceCardCompact device={device} key={device.id} />
      ))}
    </>
  );

  return (
    <div className="container mx-auto flex h-full flex-col justify-between px-8">
      <div
        data-testid="device-grid"
        className="grid grid-cols-[repeat(auto-fit,_350px)] justify-center gap-4"
      >
        {content}
      </div>
      <AppPagination
        className="my-4"
        data-testid="pagination"
        page={paginationData.page}
        pages={paginationData.pages}
      />
    </div>
  );
}
