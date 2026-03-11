import React, { useState, useRef, useEffect } from "react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const username = localStorage.getItem("username") || "Profiili";
  const avatar = localStorage.getItem("avatar");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  }

  // دالة لمعالجة رفع الصورة
  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target && typeof event.target.result === "string") {
          localStorage.setItem("avatar", event.target.result);
          window.location.reload(); // لإعادة تحميل الصورة فورًا
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-fuchsia-400 border-2 border-fuchsia-300 shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        style={{boxShadow:'0 4px 16px 0 rgba(80,0,120,0.10)'}}
      >
        {/* صورة دائرية أو أيقونة */}
        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-fuchsia-300 shadow-md mr-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#f3e8ff"/>
            <path d="M12 12c1.933 0 3.5-1.567 3.5-3.5S13.933 5 12 5s-3.5 1.567-3.5 3.5S10.067 12 12 12zm0 2c-2.33 0-7 1.167-7 3.5V20h14v-2.5c0-2.333-4.67-3.5-7-3.5z" fill="#a21caf"/>
          </svg>
        </span>
        {/* اسم المستخدم */}
        <span className="text-lg font-extrabold text-white drop-shadow-sm tracking-wide pr-2" style={{letterSpacing:'0.04em'}}>{username}</span>
        <svg className={`w-4 h-4 transition-transform text-white ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-gradient-to-b from-black via-gray-900 to-green-500 rounded-2xl shadow-2xl z-50 border border-fuchsia-200 animate-fade-in flex flex-col items-center" style={{minWidth:240}}>
          <div className="relative w-full flex flex-col items-center p-6 pt-8">
            {/* صورة شخصية حقيقية أو أيقونة افتراضية */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 via-blue-400 to-green-400 flex items-center justify-center shadow-lg border-4 border-white mb-2 overflow-hidden relative group">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#f3e8ff"/>
                  <path d="M12 12c1.933 0 3.5-1.567 3.5-3.5S13.933 5 12 5s-3.5 1.567-3.5 3.5S10.067 12 12 12zm0 2c-2.33 0-7 1.167-7 3.5V20h14v-2.5c0-2.333-4.67-3.5-7-3.5z" fill="#a21caf"/>
                </svg>
              )}
              {/* زر رفع صورة */}
              <label className="absolute bottom-0 right-0 bg-fuchsia-600 text-white rounded-full p-1 cursor-pointer shadow-md opacity-80 hover:opacity-100 transition-opacity text-xs group-hover:scale-110" title="vaihda kuva" style={{fontSize:'0.7rem'}}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 16v-4m0 0V8m0 4h4m-4 0H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            {/* اسم المستخدم */}
            <div className="font-extrabold text-fuchsia-700 text-xl mb-1 tracking-wide text-center w-full break-words">{username}</div>
            <div className="text-gray-400 text-xs mb-3 text-center w-full">Tili</div>
            <hr className="my-2 border-fuchsia-100 w-full" />
            <button
              className="flex items-center gap-2 w-full justify-center text-fuchsia-700 bg-gradient-to-r from-fuchsia-100 to-blue-100 hover:from-fuchsia-200 hover:to-blue-200 font-bold py-2 px-4 rounded-xl shadow transition-all duration-200 hover:scale-105 hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-blue-500 mb-2"
              onClick={handleLogout}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M16 17l5-5m0 0l-5-5m5 5H9m4 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Kirjaudu ulos</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
