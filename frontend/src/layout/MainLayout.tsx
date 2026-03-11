import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-green-100 via-blue-50 to-white text-gray-900 font-sans">
      {/* Sidebar ثابت */}
      <Sidebar />
      {/* محتوى الصفحة */}
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="h-24 bg-blue-100 bg-opacity-90 border-b border-blue-200 flex items-center px-12 shadow-md justify-between gap-8">
          <div className="flex-1 flex justify-center">
            <Topbar />
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Kaikki kappaleet, soittolistat ja käyttäjätiedot */}
          <Outlet />
        </main>
        <footer className="h-16 bg-white bg-opacity-90 border-t border-gray-200 flex items-center justify-center text-sm text-gray-500">
          © {new Date().getFullYear()} Mini-Spotify – Kaikki oikeudet pidätetään
        </footer>
      </div>
    </div>
  );
}
