import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SortSelect } from "@/components/grid/sort-select";
import { DeviceGrid } from "@/components/grid/device-grid";
import { Suspense } from "react";
import { SearchInput } from "@/components/grid/search-input";

import { DevicesQuerySchema } from "@retrolist/shared";
import { getQueryString } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DetailSelect } from "@/components/grid/detail-select";

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = await props.searchParams;
  const { page, page_size, detail, search, sort_by, order, filters } =
    DevicesQuerySchema.parse(searchParams);

  const queryString = getQueryString(searchParams);

  return (
    <SidebarProvider>
      <AppSidebar filters={filters} />
      <main className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="m-4 flex flex-wrap justify-center gap-4">
          <SearchInput searchText={search} />
          <div className="flex flex-row gap-2">
            <DetailSelect detail={detail} />
            <SortSelect sortBy={sort_by} order={order} />
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col items-center">
              <div className="container grid grid-cols-4 gap-4 p-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="h-[250px] w-full" />
                ))}
              </div>
            </div>
          }
        >
          <DeviceGrid queryString={queryString} />
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
