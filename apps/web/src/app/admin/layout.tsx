import { AdminSideBar } from "@/components/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSideBar />
      <main className="p-4 w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}