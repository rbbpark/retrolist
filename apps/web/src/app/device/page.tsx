import { TooltipDemo } from "@/components/tooltip-badge";
import { DeviceCard } from "@/components/device-card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SelectDemo } from "@/components/app-select";
import { PaginationDemo } from "@/components/pagination-demo";

export default function Page() {
  return (
    <SidebarProvider>
      <main className="flex flex-1 flex-col">
        <SiteHeader />
        <div className="m-4 flex justify-center gap-4">
          <Input className="w-96" />
          <SelectDemo />
        </div>
        <div className="flex flex-1 flex-row flex-wrap gap-4 p-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <DeviceCard />
          ))}
          <PaginationDemo />
        </div>
      </main>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
