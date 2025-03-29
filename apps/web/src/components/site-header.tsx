import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Funnel } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1">
        <Funnel />
      </SidebarTrigger>
      <Separator className="mr-2 !h-4" orientation="vertical" />
      <h1 className="text-base font-medium">
        <Link href="/device">Retrolist</Link>
      </h1>
    </header>
  );
}
