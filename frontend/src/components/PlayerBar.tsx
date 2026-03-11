import React, { useState } from "react";

type PlayerBarProps = {
  url: string;
  title: string;
  artist: string;
  image: string;
};

export default function PlayerBar({ url, title, artist, image }: PlayerBarProps) {
  const [time, setTime] = useState(0);
  const [vol, setVol] = useState(60);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className="player-row">
      {/* زر الإغلاق */}
      <button
        onClick={handleClose}
        className="px-2 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition mr-2"
        title="إغلاق المشغل"
      >
        ✖
      </button>
      {/* track mini */}
      <div className="track-mini">
        <div className="thumb">
          {image ? <img src={image.startsWith('/images/') ? image : `/images/${image}`} alt={title} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} /> : "♪"}
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>{title}</div>
          <div className="time">{artist}</div>
        </div>
      </div>

      {/* controls + progress */}
      <div className="controls" style={{ gap: 12 }}>
        <button className="control" title="Edellinen">⏮️</button>
        <button className="control" title="Toista/Pysäytä">▶️</button>
        <button className="control" title="Seuraava">⏭️</button>
        <div className="progress" style={{ minWidth: 200, flex: 1 }}>
          <span className="time">{format(time)}</span>
          <input
            type="range" min={0} max={240} value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
          <span className="time">4:00</span>
        </div>
      </div>

      {/* volume */}
      <div className="volume">
        <span>🔊</span>
        <input type="range" min={0} max={100} value={vol} onChange={(e) => setVol(Number(e.target.value))} style={{ width: 140 }} />
      </div>
    </div>
  );
}

function format(n:number){
  const m=Math.floor(n/60), s=(n%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
