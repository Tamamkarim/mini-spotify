import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Player from './pages/Player';
import SongPage from './pages/SongPage';
import Login from './pages/Login';
import Signup from './pages/Signup';


export default function App() {
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        console.log(data); 
      })
      .catch(err => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/player" element={<Player />} />
        <Route path="/song/:id" element={<SongPage />} />
      </Route>
    </Routes>
  );
}
