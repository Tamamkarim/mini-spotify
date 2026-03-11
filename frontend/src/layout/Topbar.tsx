import React from "react";
// SVG شعار سبوتيفاي
const spotifyLogo = (
  <svg viewBox="0 0 168 168" width="40" height="40" fill="none">
    <circle cx="84" cy="84" r="84" fill="#191414"/>
    <path d="M120.1 121.6c-1.7 2.8-5.3 3.7-8.1 2-22.2-13.6-50.2-16.7-83.2-9.2-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.6-8 66.1-4.5 90.2 10.5 2.8 1.7 3.7 5.3 2 8.3zm11.6-23.2c-2.1 3.4-6.5 4.5-9.9 2.4-25.4-15.6-64.2-20.1-94.2-11.1-3.8 1.1-7.8-1.1-8.9-4.9-1.1-3.8 1.1-7.8 4.9-8.9 33.7-9.8 75.1-5 103.6 12.2 3.4 2.1 4.5 6.5 2.4 9.9zm12.2-25.2c-29-17.2-77.2-18.8-104.7-10.4-4.4 1.3-9-1.2-10.3-5.6-1.3-4.4 1.2-9 5.6-10.3 30.7-9.2 83.2-7.4 115.6 11.2 4 2.4 5.3 7.7 2.9 11.7-2.3 4-7.6 5.3-11.7 2.9z" fill="#1ED760"/>
  </svg>
);
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";


const links = [
  { to: "/", label: "Etusivu", icon: "🏠" },
  { to: "/upload", label: "Lataa kappale", icon: "⬆️" },
];

export default function Topbar() {
  const location = useLocation();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');
  return (
    <nav className="flex flex-row items-center w-full bg-gradient-to-r from-green-200 via-blue-100 to-fuchsia-200 rounded-2xl shadow-2xl py-5 px-14 border-b-4 border-fuchsia-300 animate-gradient-x">
      {/* الشعار فقط */}
      <div className="flex items-center mr-8 flex-none">{spotifyLogo}</div>
      {/* الروابط في المنتصف */}
      <div className="flex-1 flex flex-row justify-center gap-16 items-center">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center justify-center px-5 py-2 group transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-100 hover:to-green-100 hover:shadow-2xl active:scale-95 border-2 border-transparent hover:border-fuchsia-400`}
            style={{minWidth:'110px', background:'none', boxShadow:'none'}}
          >
            <span
              className="text-4xl mb-1 transition-all duration-300 group-hover:text-fuchsia-600 group-hover:scale-110 group-hover:animate-wiggle group-active:animate-spin"
              style={{color:'#7c3aed', filter:'drop-shadow(0 2px 6px #a21caf88)'}}
            >
              {link.icon}
            </span>
            <span className="text-lg font-bold text-purple-900 transition-all duration-300 group-hover:text-fuchsia-700 group-hover:tracking-widest group-hover:scale-105">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
      {/* زر التسجيل وتسجيل الدخول أو البروفايل */}
      <div className="flex-1 flex justify-end items-center">
        {!isLoggedIn ? (
          <div className="flex flex-row gap-4 pl-2 pr-2">
            <Link
              to="/signup"
              className="text-white font-extrabold text-2xl px-14 py-6 rounded-full border-4 border-cyan-400 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 shadow-2xl hover:shadow-cyan-400/60 hover:scale-110 transition-all duration-300 animate-pulse hover:animate-bounce focus:outline-none"
              style={{letterSpacing:'0.12em'}}
            >
              Rekisteröidy
            </Link>
            <Link
              to="/login"
              className="text-white font-extrabold text-2xl px-14 py-6 rounded-full border-4 border-blue-400 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-700 shadow-2xl hover:shadow-blue-400/60 hover:scale-110 transition-all duration-300 animate-pulse hover:animate-bounce focus:outline-none"
              style={{letterSpacing:'0.16em'}}
            >
              Kirjaudu sisään
            </Link>
          </div>
        ) : (
          <div className="ml-4">
            <ProfileDropdown />
          </div>
        )}
      </div>
    </nav>
  );
}
