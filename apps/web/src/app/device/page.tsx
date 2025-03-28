import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SelectDemo } from "@/components/app-select";
import { DeviceGrid } from "@/components/device/device-grid";
import { Suspense } from "react";

import { DevicesQuerySchema } from "@retrolist/shared";

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = await props.searchParams;
  console.log(searchParams);
  const { page, page_size, detail, search, sort_by, order, filters } =
    DevicesQuerySchema.parse(searchParams);

  return (
    <SidebarProvider>
      <main className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="m-4 flex justify-center gap-4">
          <Input className="w-96" />
          <SelectDemo />
        </div>
        <div className="flex flex-1 flex-row flex-wrap gap-4 p-4">
          <Suspense>
            <DeviceGrid page={page} pageSize={page_size} />
          </Suspense>
        </div>
      </main>
      {/* Pass filters to Sidebar */}
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
