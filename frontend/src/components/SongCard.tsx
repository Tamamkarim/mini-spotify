import React, { useState } from "react";

type Props = {
  title: string;
  artist: string;
  cover: string;
  onPlay: () => void;
  liked?: boolean;
  onLike?: () => void;
};

export default function SongCard({ title, artist, cover, onPlay, liked = false, onLike }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg hover:bg-green-50 transition flex flex-col items-center shadow-lg relative group border border-gray-200">
      <div className="relative w-32 h-32 mb-2">
        <img src={cover.startsWith('/images/') ? cover : `/images/${cover}`} className="rounded-md w-32 h-32 object-cover shadow-md border border-gray-100" alt={title} />
        {/* زر تشغيل أكبر في منتصف الصورة يظهر عند المرور */}
        <button
          onClick={onPlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 text-white rounded-full p-4 text-2xl opacity-0 group-hover:opacity-100 transition"
          title="تشغيل"
        >
          ▶
        </button>
      </div>
      <button
        onClick={onLike}
        className="absolute top-3 right-3 text-2xl focus:outline-none transition-transform group-hover:scale-110"
        title={liked ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      >
        <span className={liked ? "text-red-500" : "text-gray-400 hover:text-red-400"}>
          {liked ? "❤️" : "🤍"}
        </span>
      </button>
      <h3 className="mt-3 text-gray-900 text-center text-base font-semibold truncate w-full max-w-[8rem]">{title}</h3>
      <p className="text-gray-500 text-center text-sm truncate w-full max-w-[8rem]">{artist}</p>
      {/* زر تشغيل صغير أسفل البطاقة */}
      <button
        onClick={onPlay}
        className="bg-green-400 mt-3 px-3 py-1 rounded-full text-white hover:bg-blue-400 transition shadow"
      >
        ▶
      </button>
    </div>
  );
}