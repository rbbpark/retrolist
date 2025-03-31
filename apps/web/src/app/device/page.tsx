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
import { DetailSelect } from "@/components/device/detail-select";

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchParams = await props.searchParams;
  const { page, page_size, detail, search, sort_by, order, filters } =
    DevicesQuerySchema.parse(searchParams);

  const queryString = getQueryString(searchParams);

  console.log(filters);

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
        <Suspense fallback={<Skeleton className="h-[250px] w-[250px]" />}>
          <DeviceGrid queryString={queryString} />
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
