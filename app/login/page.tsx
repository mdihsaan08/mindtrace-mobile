"use client";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const P = { plum:"#524660", mauve:"#9F8383", blush:"#CEAEB0", cream:"#FDDCB0" };

function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setError(""); setLoading(true);
    try {
      const result = await signIn("credentials", { email:form.email.toLowerCase().trim(), password:form.password, redirect:false });
      if (result?.error) setError("Incorrect email or password.");
      else if (result?.ok) window.location.href = "/dashboard";
      else setError("Something went wrong.");
    } catch { setError("Could not connect."); }
    finally { setLoading(false); }
  }

  return (
    <main style={{ minHeight:"100vh", background:"#FEF6EC", display:"flex" }}>
      <div style={{ display:"none" }} className="md-left-panel"/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
        <div style={{ marginBottom:28, textAlign:"center" }}>
          <div style={{ width:48, height:48, borderRadius:14, background:P.plum, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
            <span style={{ color:P.cream, fontSize:20, fontFamily:"Georgia,serif", fontWeight:700 }}>M</span>
          </div>
          <span style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:600, color:P.plum }}>MindTrace</span>
        </div>
        <div style={{ width:"100%", maxWidth:380 }}>
          <h1 style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:500, color:P.plum, marginBottom:4 }}>Welcome back</h1>
          <p style={{ fontSize:13, color:P.mauve, marginBottom:24 }}>Sign in to your journal</p>
          <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[{id:"email",label:"Email",type:"email",ph:"you@example.com",ac:"email"},{id:"password",label:"Password",type:"password",ph:"••••••••",ac:"current-password"}].map(f=>(
              <div key={f.id}>
                <label style={{ display:"block", fontSize:11, fontWeight:700, color:P.mauve, marginBottom:6, textTransform:"uppercase" as const, letterSpacing:"0.08em" }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} required autoComplete={f.ac}
                  value={form[f.id as keyof typeof form]} onChange={e=>setForm({...form,[f.id]:e.target.value})}
                  style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${P.blush}`, background:"white", color:P.plum, fontSize:16, outline:"none" }}/>
              </div>
            ))}
            {error && <div style={{ fontSize:13, color:"#c0392b", background:"#fdf0ef", border:"1px solid #f5c6c2", borderRadius:10, padding:"11px 14px" }}>⚠ {error}</div>}
            <button type="submit" disabled={loading} style={{ padding:"14px", borderRadius:11, background:P.plum, color:P.cream, fontSize:15, fontWeight:500, border:"none", cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1, boxShadow:`0 4px 14px ${P.plum}40`, marginTop:4 }}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>
          <p style={{ textAlign:"center", marginTop:20, fontSize:14, color:P.mauve }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color:P.plum, fontWeight:600, textDecoration:"none" }}>Create one free</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
export default function LoginPage() {
  return <Suspense fallback={<div style={{ minHeight:"100vh", background:"#FEF6EC" }}/>}><LoginForm/></Suspense>;
}
