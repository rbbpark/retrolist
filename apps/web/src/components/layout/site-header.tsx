import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 flex-row items-center justify-between border-b px-4">
      <div className="flex flex-row items-center gap-2">
        <SidebarTrigger className="-ml-1">
          <PanelLeft />
        </SidebarTrigger>
        <Separator className="mr-2 !h-4" orientation="vertical" />
        <h1 className="text-base font-medium">
          <Link href="/device">retrolist</Link>
        </h1>
      </div>
      <ModeToggle />
    </header>
  );
}
