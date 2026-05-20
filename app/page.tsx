import Link from "next/link";
const P = { plum:"#524660", mauve:"#9F8383", blush:"#CEAEB0", cream:"#FDDCB0" };
export default function LandingPage() {
  return (
    <main style={{ minHeight:"100vh", background:`linear-gradient(135deg,#F4F1F6 0%,#FEF6EC 60%,#FDF8F8 100%)`, display:"flex", flexDirection:"column", overflowY:"auto" }}>
      {/* Nav */}
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:`1px solid ${P.blush}33`, background:"rgba(255,253,249,0.9)", backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:30, height:30, borderRadius:9, background:P.plum, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:P.cream, fontSize:12, fontFamily:"Georgia,serif", fontWeight:600 }}>M</span>
          </div>
          <span style={{ fontFamily:"Georgia,serif", fontSize:17, fontWeight:600, color:P.plum }}>MindTrace</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Link href="/login" style={{ padding:"7px 14px", borderRadius:9, border:`1px solid ${P.blush}`, color:P.mauve, fontSize:13, fontWeight:500, textDecoration:"none", background:"white" }}>Sign in</Link>
          <Link href="/register" style={{ padding:"7px 14px", borderRadius:9, background:P.plum, color:P.cream, fontSize:13, fontWeight:500, textDecoration:"none" }}>Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"60px 20px 40px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"white", border:`1px solid ${P.blush}`, borderRadius:999, padding:"5px 14px", marginBottom:24 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:P.blush, display:"inline-block" }}/>
          <span style={{ fontSize:12, color:P.mauve, fontWeight:500 }}>AI-powered emotional insight</span>
        </div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(36px, 8vw, 62px)", fontWeight:400, color:P.plum, lineHeight:1.15, marginBottom:16, letterSpacing:"-0.5px", maxWidth:580 }}>
          Write freely.<br/><span style={{ fontStyle:"italic", fontWeight:300, color:P.mauve }}>Understand yourself.</span>
        </h1>
        <p style={{ fontSize:"clamp(13px, 3vw, 15px)", color:P.mauve, maxWidth:400, lineHeight:1.7, marginBottom:32, padding:"0 8px" }}>
          MindTrace uses AI to analyze your journal entries, detect emotional patterns, and deliver compassionate insights.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:280 }}>
          <Link href="/register" style={{ padding:"14px 32px", borderRadius:12, background:P.plum, color:P.cream, fontSize:14, fontWeight:500, textDecoration:"none", textAlign:"center", boxShadow:`0 4px 20px ${P.plum}40` }}>
            Start journaling free →
          </Link>
          <Link href="/login" style={{ padding:"14px 24px", borderRadius:12, border:`1px solid ${P.blush}`, color:P.mauve, fontSize:14, fontWeight:500, textDecoration:"none", textAlign:"center", background:"white" }}>
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:"0 16px 60px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:12, maxWidth:860, margin:"0 auto", width:"100%" }}>
        {[{icon:"✦",title:"AI Analysis",desc:"Every entry analyzed for mood, emotions, and themes with a personal insight."},{icon:"◎",title:"Pattern Detection",desc:"See your mood trends and emotional cycles across all your entries."},{icon:"◈",title:"Private & Safe",desc:"Your entries are encrypted. Your thoughts stay yours, always."}].map(f=>(
          <div key={f.title} style={{ background:"white", borderRadius:14, border:`1px solid ${P.blush}44`, padding:18 }}>
            <div style={{ width:30, height:30, borderRadius:8, background:`${P.blush}33`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, color:P.mauve, fontSize:12 }}>{f.icon}</div>
            <p style={{ fontWeight:600, color:P.plum, marginBottom:5, fontSize:13 }}>{f.title}</p>
            <p style={{ fontSize:12, color:P.mauve, lineHeight:1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      <footer style={{ textAlign:"center", padding:"16px", fontSize:12, color:P.blush, borderTop:`1px solid ${P.blush}33` }}>
        MindTrace — AI Application Challenge · Built with 💜
      </footer>
    </main>
  );
}
