import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Etusivu" },
  { to: "/search", label: "Haku" },
  { to: "/upload", label: "Lataa kappale" },
  { to: "/profile", label: "Profiili" },
];

export default function Sidebar() {
  // ...existing code...
  return (
    <aside className="bg-black min-h-screen w-64 flex flex-col pt-10 px-6">
     
    </aside>
  );
}
