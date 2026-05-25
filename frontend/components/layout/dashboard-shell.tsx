import Sidebar from "./sidebar";

import Navbar from "./navbar";

import MobileBottomNavbar from "./mobile-bottom-navbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex flex-1 flex-col">
          <Navbar />

          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>

      <MobileBottomNavbar />
    </div>
  );
}