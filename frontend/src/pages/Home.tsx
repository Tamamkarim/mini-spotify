import React, { useMemo, useState } from 'react';
import PlaylistCard from "../components/PlaylistCard";
import SongCard from "../components/SongCard";
import ReactModal from 'react-modal';
import PlayerBar from "../components/PlayerBar";

const songsData = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    image: "/images/cover-1.jpeg",
    url: "/audio/blinding-lights.mp3",
    date: "huhti 2021",
    duration: "3:49"
  },
  {
    id: 2,
    title: "Levitating",
    artist: "Dua Lipa",
    image: "/images/cover-2.jpeg",
    url: "/audio/levitating.mp3",
    date: "huhti 2022",
    duration: "3:24"
  },
  {
    id: 3,
    title: "Save Your Tears",
    artist: "The Weeknd",
    image: "/images/cover-3.jpeg",
    url: "/audio/save-your-tears.mp3",
    date: "huhti 2023",
    duration: "3:36"
  },
  {
    id: 4,
    title: "Peaches",
    artist: "Justin Bieber",
    image: "/images/cover-4.jpeg",
    url: "/audio/peaches.mp3",
    date: "huhti 2024",
    duration: "3:18"
  },
  {
    id: 5,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    image: "/images/cover-5.jpeg",
    url: "/audio/dl.mp3",
    date: "huhti 2020",
    duration: "2:54"
  },
  {
    id: 6,
    title: "Bad Guy",
    artist: "Billie Eilish",
    image: "/images/cover-6.jpeg",
    url: "/audio/bad-guy.mp3",
    date: "huhti 2026",
    duration: "3:14"
  },
  {
    id: 7,
    title: "The Nights",
    artist: "Coldplay",
    image: "/images/cover-7.jpeg",
    url: "/audio/the-nights.mp3",
    date: "huhti 2023",
    duration: "4:01"
  },
  {
    id: 8,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/cover-8.jpeg",
    url: "/audio/shape-of-you.mp3",
    date: "huhti 2022",
    duration: "3:53"
  },
  {
    id: 9,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/cover-9.jpeg",
    url: "/audio/dl3.mp3",
    date: "huhti 2021",
    duration: "3:53"
  },
  {
    id: 10,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/cover-10.jpeg",
    url: "/audio/dl4.mp3",
    date: "huhti 2024",
    duration: "3:53"
  },    
  {
    id: 11,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/cover-11.jpeg",
    url: "/audio/dl5.mp3",
    date: "huhti 2020",
    duration: "3:53"
  },  
  {
    id: 12,
    title: "Shape of You",
    artist: "Ed Sheeran",
    image: "/images/cover-12.jpeg",
    url: "/audio/dl6.mp3",
    date: "huhti 2026",
    duration: "3:53"
  },
];

export default function Home() {
  // بيانات وهمية لبطاقات قوائم التشغيل (للتصميم فقط)
  const featuredPlaylists = [
    {
      cover: "/images/cover-1.jpeg",
      title: "DREAMS",
      subtitle: "Emerging Indie: Dreams",
      description: "Scenes: Indie",
    },
    {
      cover: "/images/cover-2.jpeg",
      title: "TECHNO",
      subtitle: "New Techno Now: Techno",
      description: "Main Room: Dance",
    },
    {
      cover: "/images/cover-3.jpeg",
      title: "PLUGG",
      subtitle: "New Plugg Music: Plugg",
      description: "Hustle: Rap & Hip-Hop",
    },
    {
      cover: "/images/cover-4.jpeg",
      title: "THE LOOKOUT",
      subtitle: "Tomorrow's Rap Hits: The Lookout",
      description: "Hustle: Rap & Hip-Hop",
    },
    {
      cover: "/images/cover-5.jpeg",
      title: "New Africa",
      subtitle: "New Africa",
      description: "Vibrations",
    },
  ];
  // إضافة حالة الإعجاب للأغاني
  const [songs, setSongs] = useState(songsData.map(song => ({ ...song, liked: false })));
  const [showLiked, setShowLiked] = useState(false);
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState<typeof songs[0] | null>(null);

  // قوائم التشغيل
  const [playlists, setPlaylists] = useState<{ name: string; songs: typeof songs[0][] }[]>([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [addToPlaylistIndex, setAddToPlaylistIndex] = useState<number | null>(null);
  const [viewPlaylistIdx, setViewPlaylistIdx] = useState<number | null>(null);

  // دالة لتغيير حالة الإعجاب
  const toggleLike = (index: number) => {
    setSongs(prev => prev.map((song, i) => i === index ? { ...song, liked: !song.liked } : song));
  };

  // دالة لإضافة قائمة تشغيل جديدة
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists(prev => [...prev, { name: newPlaylistName.trim(), songs: [] }]);
      setNewPlaylistName("");
      setShowPlaylistModal(false);
    }
  };

  // دالة لإضافة أغنية إلى قائمة تشغيل
  const handleAddSongToPlaylist = (playlistIdx: number) => {
    if (addToPlaylistIndex !== null) {
      setPlaylists(prev => prev.map((pl, i) => i === playlistIdx ? { ...pl, songs: [...pl.songs, songs[addToPlaylistIndex]] } : pl));
      setAddToPlaylistIndex(null);
    }
  };

  // الأغاني المعجب بها فقط
  const likedSongs = useMemo(() => songs.filter(song => song.liked), [songs]);

  // تصفية الأغاني حسب البحث
  const songsToShow = useMemo(() => {
    const list = showLiked ? likedSongs : songs;
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(song =>
      song.title.toLowerCase().includes(q) || song.artist.toLowerCase().includes(q)
    );
  }, [showLiked, likedSongs, songs, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-black flex flex-col items-center px-3 pb-36 font-sans selection:bg-emerald-300/20 selection:text-emerald-100" dir="ltr">
      {/* تم حذف قسم بطاقات قوائم التشغيل */}
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between mt-10 mb-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/40 flex items-center justify-center">
            <span className="text-emerald-300 text-xl">🎵</span>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="px-3 py-2 rounded-xl bg-neutral-900/80 text-white border border-neutral-700 focus:border-emerald-400/60 outline-none shadow-inner shadow-black/40 text-sm w-56 md:w-72 placeholder:text-neutral-400"
            placeholder="Etsi kappaletta tai artistia..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-2 rounded-xl font-semibold text-sm transition-all border
                ${!showLiked
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow shadow-emerald-500/30'
                  : 'bg-transparent text-emerald-300 border-emerald-600 hover:bg-emerald-600/10'}`}
              onClick={() => setShowLiked(false)}
              aria-pressed={!showLiked}
              title="Näytä kaikki kappaleet"
            >
              Kaikki kappaleet
            </button>
            <button
              className={`px-3 py-2 rounded-xl font-semibold text-sm transition-all border
                ${showLiked
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow shadow-emerald-500/30'
                  : 'bg-transparent text-emerald-300 border-emerald-600 hover:bg-emerald-600/10'}`}
              onClick={() => setShowLiked(true)}
              aria-pressed={showLiked}
              title="Näytä suosikit"
            >
              Suosikit {likedSongs.length > 0 && <span className="ml-1">❤️</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Soittolistat */}
      <section className="w-full max-w-6xl mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-bold text-emerald-300">Soittolistat</h3>
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-emerald-600 transition shadow shadow-emerald-500/30"
            onClick={() => setShowPlaylistModal(true)}
          >
            + Uusi soittolista
          </button>
        </div>

        <div className="flex gap-3 flex-wrap mb-6">
          {/* عرض قوائم التشغيل */}
          {playlists.length > 0 && (
            playlists.map((pl, idx) => (
              <button
                key={idx}
                className="bg-neutral-900/70 rounded-2xl px-4 py-3 shadow-lg shadow-black/40 text-white hover:bg-emerald-900/40 transition focus:outline-none ring-1 ring-neutral-700 hover:ring-emerald-600"
                onClick={() => setViewPlaylistIdx(idx)}
              >
                <div className="font-semibold mb-1">{pl.name}</div>
                <div className="text-xs text-neutral-300">{pl.songs.length} kappaletta</div>
              </button>
            ))
          )}
        </div>

        {/* Modal: Näytä soittolistan sisältö */}
        <ReactModal
          isOpen={viewPlaylistIdx !== null}
          onRequestClose={() => setViewPlaylistIdx(null)}
          className="bg-neutral-950 p-6 md:p-8 rounded-2xl shadow-2xl max-w-xl mx-auto outline-none border border-emerald-700/60"
          overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          ariaHideApp={false}
        >
          {viewPlaylistIdx !== null && (
            <>
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">{playlists[viewPlaylistIdx].name}</h2>
              {playlists[viewPlaylistIdx].songs.length === 0 ? (
                <div className="text-neutral-400 mb-4">Ei kappaleita tässä soittolistassa.</div>
              ) : (
                <ul className="mb-4 space-y-2">
                  {playlists[viewPlaylistIdx].songs.map((song, i) => (
                    <li key={i} className="flex items-center gap-4 bg-neutral-900/70 ring-1 ring-neutral-700 rounded-xl p-2">
                      {/* صورة مربعة ثابتة */}
                      <div className="w-16">
                        <div className="aspect-square w-16 rounded-lg overflow-hidden ring-1 ring-emerald-700/50">
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-full h-full object-cover object-center"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-base truncate">{song.title}</div>
                        <div className="text-neutral-400 text-sm truncate">{song.artist}</div>
                      </div>
                      <button
                        className="bg-emerald-500 text-white px-3 py-2 rounded-xl hover:bg-emerald-600 transition"
                        onClick={() => setCurrentSong(song)}
                      >
                        Toista
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="bg-neutral-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-neutral-600 transition"
                onClick={() => setViewPlaylistIdx(null)}
              >
                Sulje
              </button>
            </>
          )}
        </ReactModal>
      </section>

      {/* كروت الأغاني أفقية مع تمرير جانبي */}
      <section className="w-full max-w-6xl">
        <div
          className="flex flex-wrap gap-x-16 gap-y-16 overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-700/60 scrollbar-track-transparent py-8 px-4"
          style={{ maxHeight: '460px', alignContent: 'space-between', rowGap: '64px' }}
        >
          {songsToShow.length === 0 ? (
            <div className="text-center text-neutral-400 text-lg py-12 w-full">Ei kappaleita löytynyt.</div>
          ) : (
            songsToShow.map((song) => {
              const originalIndex = songs.findIndex(s => s.id === song.id);
              return (
                <div key={song.id} className="group min-w-[200px] max-w-[200px] flex-shrink-0" style={{ height: '240px', margin: '16px' }}>
                  <div className="rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-neutral-800 hover:ring-emerald-700/60 transition p-4 flex flex-col gap-3 shadow-xl shadow-black/60 hover:scale-[1.025] duration-200">
                    {/* صورة حديثة */}
                    <div className="flex flex-col items-center text-center mt-2">
                      <div className="w-full flex justify-center mb-2">
                        <div className="aspect-square w-32 h-32 rounded-xl overflow-hidden ring-2 ring-emerald-400/60 bg-gradient-to-br from-emerald-900 via-emerald-800 to-black shadow-lg relative">
                          <img
                            src={song.image}
                            alt={song.title}
                            className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition duration-300"
                            loading="lazy"
                          />
                          {/* زر تشغيل دائري وسط الصورة */}
                          <button
                            onClick={() => setCurrentSong(song)}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full w-20 h-20 flex items-center justify-center transition duration-200 hover:bg-gray-800 hover:scale-105 border-none outline-none z-20 shadow-lg"
                            title="Toista kappale"
                          >
                            <span className="text-white text-5xl pl-1">▶️</span>
                          </button>
                        </div>
                      </div>
                      <div className="font-semibold text-white truncate w-full text-base md:text-lg">{song.title}</div>
                      <div className="text-xs text-neutral-400 truncate w-full mb-1">{song.artist}</div>
                      <div className="text-xs text-neutral-500 truncate w-full mb-1">{song.date} • {song.duration} min</div>
                      <div className="flex gap-2 mt-2 items-center justify-center">
                        <button
                          onClick={() => toggleLike(originalIndex)}
                          className={`text-2xl transition-colors duration-150 focus:outline-none ${song.liked ? 'text-red-500 scale-110' : 'text-neutral-400 hover:text-red-400'}`}
                          title={song.liked ? "Poista suosikeista" : "Lisää suosikkeihin"}
                          aria-pressed={song.liked}
                        >
                          {song.liked ? '❤️' : '🤍'}
                        </button>
                      </div>
                     
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Modal: Luo uusi soittolista */}
      <ReactModal
        isOpen={showPlaylistModal}
        onRequestClose={() => setShowPlaylistModal(false)}
        className="bg-neutral-950 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md mx-auto outline-none border border-emerald-700/60"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        ariaHideApp={false}
      >
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Luo uusi soittolista</h2>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-neutral-900 text-white mb-4 border border-neutral-700 focus:border-emerald-400 outline-none"
          placeholder="Soittolistan nimi"
          value={newPlaylistName}
          onChange={e => setNewPlaylistName(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-emerald-600 transition"
            onClick={handleCreatePlaylist}
          >
            Luo
          </button>
          <button
            className="bg-neutral-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-neutral-600 transition"
            onClick={() => setShowPlaylistModal(false)}
          >
            Peruuta
          </button>
        </div>
      </ReactModal>

      {/* Modal: Valitse soittolista kappaleelle */}
      <ReactModal
        isOpen={addToPlaylistIndex !== null}
        onRequestClose={() => setAddToPlaylistIndex(null)}
        className="bg-neutral-950 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md mx-auto outline-none border border-blue-600/60"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold text-blue-400 mb-4">Valitse soittolista</h2>
        {playlists.length === 0 ? (
          <div className="text-neutral-400 mb-4">Ei soittolistoja. Luo ensin yksi.</div>
        ) : (
          <div className="flex flex-col gap-2 mb-4">
            {playlists.map((pl, idx) => (
              <button
                key={idx}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 transition shadow shadow-blue-500/30"
                onClick={() => handleAddSongToPlaylist(idx)}
              >
                {pl.name}
              </button>
            ))}
          </div>
        )}
        <button
          className="bg-neutral-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-neutral-600 transition"
          onClick={() => setAddToPlaylistIndex(null)}
        >
          Peruuta
        </button>
      </ReactModal>
    {/* مشغل صوتي بسيط يظهر عند اختيار أغنية */}
    {currentSong && (
      <div className="fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-emerald-800 z-50 flex items-center justify-center p-2">
        <audio src={currentSong.url} autoPlay controls style={{ width: "100%", maxWidth: 600 }} />
        <span className="ml-4 text-white font-semibold">{currentSong.title} - {currentSong.artist}</span>
      </div>
    )}
  </div>
  );
}
