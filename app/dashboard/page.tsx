"use client";
import { useState } from "react";
import { MoodSelector } from "@/components/journal/MoodSelector";
import { AnalysisCard } from "@/components/journal/AnalysisCard";
import { ChatPanel } from "@/components/journal/ChatPanel";
import { AnalysisSkeleton } from "@/components/ui/SkeletonLoader";
import { AnalysisResult } from "@/lib/groq";
const P = { plum:"#524660", mauve:"#9F8383", blush:"#CEAEB0", cream:"#FDDCB0" };

export default function DashboardPage() {
  const [content,setContent]=useState("");
  const [savedContent,setSavedContent]=useState("");
  const [selectedMood,setSelectedMood]=useState("");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState<AnalysisResult|null>(null);
  const [error,setError]=useState("");
  const [showChat,setShowChat]=useState(false);

  const today=new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const charCount=content.length;
  const wordCount=content.trim().split(/\s+/).filter(Boolean).length;
  const isReady=charCount>=20;

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault(); if(!isReady||loading) return;
    setLoading(true); setError(""); setResult(null); setShowChat(false);
    try {
      const res=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content,selectedMood})});
      const data=await res.json();
      if(!res.ok){setError(data.code==="RATE_LIMIT"?"⏱ Rate limit reached. Wait 30 seconds.":data.code==="TIMEOUT"?"⏳ Request timed out. Try again.":data.error??"Something went wrong.");return;}
      setSavedContent(content); setResult(data.analysis); setContent(""); setSelectedMood("");
    } catch {setError("Could not reach the server.");}
    finally {setLoading(false);}
  }

  return (
    <div className="fade-up" style={{display:"flex",flexDirection:"column",gap:18}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <div>
          <p style={{fontSize:11,color:P.blush,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3}}>{today}</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(20px,5vw,26px)",fontWeight:500,color:P.plum}}>How are you doing?</h1>
        </div>
        {result&&<button onClick={()=>{setResult(null);setShowChat(false);}} style={{fontSize:12,color:P.mauve,background:"none",border:`1px solid ${P.blush}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",whiteSpace:"nowrap"}}>+ New</button>}
      </div>

      {/* Write form */}
      {!result&&(
        <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:P.blush,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>I&apos;m feeling</p>
            <MoodSelector value={selectedMood} onChange={setSelectedMood}/>
          </div>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:P.blush,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Today&apos;s entry</p>
            <textarea value={content} onChange={e=>setContent(e.target.value)} maxLength={5000} rows={8}
              placeholder="Write anything on your mind..."
              style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1px solid ${P.blush}77`,background:"white",fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:16,color:P.plum,lineHeight:1.8,resize:"none",outline:"none",WebkitTextSizeAdjust:"100%"}}
              onFocus={e=>e.target.style.borderColor=P.mauve} onBlur={e=>e.target.style.borderColor=`${P.blush}77`}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:5,padding:"0 2px"}}>
              <span style={{fontSize:11,color:P.blush}}>{!isReady&&charCount>0?`${20-charCount} more to unlock`:isReady?`${wordCount} words`:""}</span>
              <span style={{fontSize:11,color:P.blush}}>{charCount}/5000</span>
            </div>
            {charCount>0&&!isReady&&<div style={{height:2,background:`${P.blush}33`,borderRadius:999,marginTop:5,overflow:"hidden"}}><div style={{height:"100%",borderRadius:999,width:`${(charCount/20)*100}%`,background:`linear-gradient(90deg,${P.blush},${P.mauve})`,transition:"width 0.3s"}}/></div>}
          </div>
          {error&&<div style={{fontSize:13,color:"#c0392b",background:"#fdf0ef",border:"1px solid #f5c6c2",borderRadius:10,padding:"10px 14px",display:"flex",gap:8}}><span>⚠</span><span>{error}</span></div>}
          <button type="submit" disabled={loading||!isReady} style={{padding:"15px",borderRadius:12,background:isReady?P.plum:`${P.plum}60`,color:P.cream,fontSize:15,fontWeight:500,border:"none",cursor:isReady?"pointer":"not-allowed",boxShadow:isReady?`0 4px 16px ${P.plum}35`:"none"}}>
            {loading?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{display:"inline-flex",gap:4}}>{[0,1,2].map(i=><span key={i} className="pulse-dot" style={{width:6,height:6,borderRadius:"50%",background:P.cream,display:"inline-block",animationDelay:`${i*0.2}s`}}/>)}</span>Reflecting...</span>:"Reflect with AI →"}
          </button>
        </form>
      )}

      {loading&&<AnalysisSkeleton/>}
      {result&&!showChat&&<AnalysisCard analysis={result} onStartChat={()=>setShowChat(true)}/>}
      {result&&showChat&&<ChatPanel entryContent={savedContent} analysis={result} onClose={()=>setShowChat(false)}/>}
    </div>
  );
}
