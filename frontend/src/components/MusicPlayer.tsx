import React, { useRef, useState } from "react";

type Props = {
  url: string;
};

export default function MusicPlayer({ url }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [visible, setVisible] = useState(true);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setProgress(Number(e.target.value));
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value);
      setVolume(Number(e.target.value));
    }
  };

  if (!visible) return null;

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900 p-4 flex items-center gap-4 z-50">
      <button
        onClick={handleClose}
        className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
        title="إلغاء التشغيل"
      >
        ⏹️ إلغاء
      </button>
      <button
        onClick={toggle}
        className="bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600 transition"
      >
        {playing ? "Pause" : "Play"}
      </button>
      <input
        type="range"
        min={0}
        max={duration}
        value={progress}
        onChange={handleSeek}
        className="mx-2 w-1/2"
      />
      <span className="text-xs text-gray-300">
        {Math.floor(progress / 60)}:{("0" + Math.floor(progress % 60)).slice(-2)} /
        {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolume}
        className="mx-2 w-24"
      />
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      />
    </div>
  );
}