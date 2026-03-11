import React from 'react'

export default function Profile() {
  const username = localStorage.getItem("username") || "ضيف";
  return (
    <div>
      <div className="section-title">kansu</div>
      <div className="card" style={{display:"flex", gap:14, alignItems:"center"}}>
        <div className="cover" style={{width:80, height:80, borderRadius:12}}>👤</div>
        <div>
          <div style={{fontWeight:800}}>{username}</div>
          <div className="sub">Premium – منذ 2026</div>
        </div>
      </div>
    </div>
  );
}
