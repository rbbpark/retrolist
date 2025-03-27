import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="w-full h-full">
        <SiteHeader />
        {children}
      </main>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
