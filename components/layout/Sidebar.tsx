"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const P = { plum:"#524660", mauve:"#9F8383", blush:"#CEAEB0", cream:"#FDDCB0" };
const NAV = [
  { href:"/dashboard", label:"Write",    sub:"New entry",    icon:"✦" },
  { href:"/history",   label:"History",  sub:"Past entries", icon:"◎" },
  { href:"/patterns",  label:"Patterns", sub:"Your trends",  icon:"◈" },
];

// ── Desktop Sidebar ────────────────────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside style={{ width:220, minHeight:"100vh", background:P.plum, display:"flex", flexDirection:"column", padding:"24px 12px", flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 10px", marginBottom:32 }}>
        <div style={{ width:28, height:28, borderRadius:8, background:P.cream, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <span style={{ color:P.plum, fontSize:11, fontFamily:"Georgia,serif", fontWeight:700 }}>M</span>
        </div>
        <div>
          <p style={{ fontFamily:"Georgia,serif", fontSize:15, fontWeight:600, color:P.cream, lineHeight:1 }}>MindTrace</p>
          <p style={{ fontSize:10, color:`${P.blush}99`, marginTop:2 }}>your AI companion</p>
        </div>
      </div>
      <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
        {NAV.map(link => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{ textDecoration:"none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, background:active?"rgba(253,220,176,0.12)":"transparent", border:active?"1px solid rgba(253,220,176,0.15)":"1px solid transparent" }}>
                <div style={{ width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:active?P.cream:"rgba(206,174,176,0.15)", color:active?P.plum:P.blush, fontSize:12 }}>{link.icon}</div>
                <div>
                  <p style={{ fontSize:13, fontWeight:500, color:active?P.cream:`${P.blush}cc`, lineHeight:1, marginBottom:2 }}>{link.label}</p>
                  <p style={{ fontSize:10, color:`${P.blush}66` }}>{link.sub}</p>
                </div>
                {active && <div style={{ marginLeft:"auto", width:4, height:4, borderRadius:"50%", background:P.cream }}/>}
              </div>
            </Link>
          );
        })}
      </nav>
      <div style={{ height:1, background:`${P.blush}22`, margin:"12px 10px" }}/>
      <button onClick={() => signOut({ callbackUrl:"/" })}
        style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, background:"transparent", border:"none", cursor:"pointer", width:"100%" }}>
        <div style={{ width:30, height:30, borderRadius:8, background:"rgba(206,174,176,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:P.blush, fontSize:12 }}>→</div>
        <span style={{ fontSize:13, color:`${P.blush}99` }}>Sign out</span>
      </button>
    </aside>
  );
}

// ── Mobile Bottom Tab Bar ──────────────────────────────────────────────────────
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:50,
      background:"white", borderTop:`1px solid ${P.blush}55`,
      display:"flex", alignItems:"stretch",
      paddingBottom:"env(safe-area-inset-bottom, 0px)",
      boxShadow:"0 -4px 20px rgba(82,70,96,0.08)",
    }}>
      {NAV.map(link => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} style={{ flex:1, textDecoration:"none" }}>
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              padding:"10px 4px 8px", gap:4, transition:"all 0.15s",
            }}>
              <div style={{
                width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
                background: active ? P.plum : "transparent",
                fontSize:14, transition:"all 0.15s",
                color: active ? P.cream : P.mauve,
              }}>
                {link.icon}
              </div>
              <span style={{ fontSize:10, fontWeight:active?600:400, color:active?P.plum:P.mauve, letterSpacing:"0.02em" }}>
                {link.label}
              </span>
            </div>
          </Link>
        );
      })}
      {/* Sign out tab */}
      <button onClick={() => signOut({ callbackUrl:"/" })} style={{
        flex:1, background:"none", border:"none", cursor:"pointer",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"10px 4px 8px", gap:4,
      }}>
        <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:P.mauve, fontSize:14 }}>→</div>
        <span style={{ fontSize:10, fontWeight:400, color:P.mauve }}>Sign out</span>
      </button>
    </nav>
  );
}
