import SiderBar from "@/components/ui/SideBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="h-screen bg-slate-200 flex">
      <SiderBar name="Food Admin" />
      {children}
    </div>
  );
}
