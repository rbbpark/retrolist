import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SortSelect } from "@/components/device/sort-select";
import { DeviceGrid } from "@/components/device/device-grid";
import { Suspense } from "react";
import { SearchInput } from "@/components/device/search-input";

import { DevicesQuerySchema } from "@retrolist/shared";
import { getQueryString } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = await props.searchParams;
  const { page, page_size, detail, search, sort_by, order, filters } =
    DevicesQuerySchema.parse(searchParams);

  const queryString = getQueryString(searchParams);
  console.log(searchParams);
  console.log(queryString);

  return (
    <SidebarProvider>
      <main className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="m-4 flex justify-center gap-4">
          <SearchInput searchText={search} />
          <SortSelect sortBy={sort_by} order={order} />
        </div>
        <div className="flex flex-1 flex-row flex-wrap gap-4 p-4">
          {/* TODO loading skeleton */}
          <Suspense fallback={<Skeleton className="h-[250px] w-[250px]" />}>
            <DeviceGrid queryString={queryString} />
          </Suspense>
        </div>
      </main>
      {/* Pass filters to Sidebar */}
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
