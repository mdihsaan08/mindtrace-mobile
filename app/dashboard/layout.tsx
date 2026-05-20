import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div style={{ background:"#FEF6EC", minHeight:"100vh" }}>
      {/* Desktop layout — sidebar + content */}
      <div className="hidden md:flex" style={{ height:"100vh", overflow:"hidden" }}>
        <Sidebar/>
        <main style={{ flex:1, overflowY:"auto", padding:"32px 40px" }}>
          <div style={{ maxWidth:580, margin:"0 auto" }}>{children}</div>
        </main>
      </div>

      {/* Mobile layout — full screen + bottom nav */}
      <div className="flex md:hidden" style={{ flexDirection:"column", minHeight:"100vh" }}>
        {/* Mobile header */}
        <header style={{
          position:"sticky", top:0, zIndex:40,
          background:"rgba(254,246,236,0.95)", backdropFilter:"blur(12px)",
          borderBottom:"1px solid #CEAEB033",
          padding:"14px 20px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:26, height:26, borderRadius:7, background:"#524660", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#FDDCB0", fontSize:10, fontFamily:"Georgia,serif", fontWeight:700 }}>M</span>
            </div>
            <span style={{ fontFamily:"Georgia,serif", fontSize:16, fontWeight:600, color:"#524660" }}>MindTrace</span>
          </div>
          <span style={{ fontSize:11, color:"#9F8383", background:"#CEAEB022", padding:"4px 10px", borderRadius:999, border:"1px solid #CEAEB055" }}>
            AI Journal
          </span>
        </header>

        {/* Mobile content — padded for bottom nav */}
        <main style={{ flex:1, padding:"20px 16px 88px" }}>
          {children}
        </main>

        <BottomNav/>
      </div>
    </div>
  );
}
