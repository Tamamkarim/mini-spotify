import React from "react";
export default function PlayerPage(){
  return (
    <div>
      <div className="section-title">المشغّل</div>
      <div className="card">
        <div className="cover" style={{aspectRatio:"16/9"}}>MV</div>
        <div className="title">Now Playing: Night Drive</div>
        <div className="sub">Fares</div>
      </div>
    </div>
  );
}
