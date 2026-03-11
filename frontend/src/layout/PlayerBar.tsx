import { useState } from "react";

export default function PlayerBar(){
  const [time, setTime] = useState(0);
  const [vol, setVol] = useState(60);

  return (
    <div className="player-row">
      {/* track mini */}
      <div className="track-mini">
        <div className="thumb">♪</div>
        <div>
          <div style={{fontWeight:700}}>Night Drive</div>
          <div className="time">Fares – Single</div>
        </div>
      </div>

      {/* controls + progress */}
      <div className="flex flex-col items-center flex-1 px-8">
        <div className="flex items-center gap-6 mb-1">
          <button className="spotify-btn w-10 h-10 flex items-center justify-center" title="ennen">⏮️</button>
          <button className="spotify-btn w-12 h-12 flex items-center justify-center text-xl" title="toista/pysäytä">▶️</button>
          <button className="spotify-btn w-10 h-10 flex items-center justify-center" title="seuraava">⏭️</button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-xl">
          <span className="text-xs text-gray-400">{format(time)}</span>
          <input
            type="range" min={0} max={240} value={time}
            onChange={(e)=>setTime(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <span className="text-xs text-gray-400">4:00</span>
        </div>
      </div>

      {/* volume */}
      <div className="volume">
        <span>🔊</span>
        <input type="range" min={0} max={100} value={vol} onChange={(e)=>setVol(Number(e.target.value))} style={{width:140}} />
      </div>
    </div>
  );
}

function format(n:number){
  const m=Math.floor(n/60), s=(n%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
