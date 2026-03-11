import React from 'react'
import { useParams } from 'react-router-dom'

export default function SongPage() {
  const { id } = useParams();
  return (
    <div style={{display:"grid", gap:16}}>
      <div className="section-title">الأغنية #{id}</div>
      <div className="card" style={{display:"grid", gridTemplateColumns:"140px 1fr", gap:16}}>
        <div className="cover">♪</div>
        <div>
          <div className="title">اسم الأغنية</div>
          <div className="sub">اسم الفنان</div>
          <div style={{marginTop:12, display:"flex", gap:10}}>
            <button className="primary-btn">تشغيل</button>
            <button className="icon-btn">❤</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="title">كلمات مختصرة</div>
        <div className="sub">…</div>
      </div>
    </div>
  );
}
