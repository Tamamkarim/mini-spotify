import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage("All fields are required!");
      return;
    }
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Login failed");
      } else {
        setMessage("Login Successful");
        // حفظ اسم المستخدم في localStorage
        if (data.user && data.user.username) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("token", "dummy"); // ضروري لظهور البروفايل
        }
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      setMessage("An error occurred. Try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center w-full bg-hover">
      <div className="bg-background flex items-center flex-col px-6 lg:px-12 py-6 rounded-md max-w-[400px] w-[90%]">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-16 h-16 max-w-[64px] max-h-[64px]"
          style={{ width: '64px', height: '64px', objectFit: 'contain' }}
        />
        <h2 className="text-3xl font-bold text-white my-2 mb-8 text-center">
          Log in to Spotify
        </h2>
        <form onSubmit={handleLogin} className="w-full">
          {message && (
            <p className="bg-primary font-semibold text-center mb-4 py-1">
              {message}
            </p>
          )}
          <input
            type="text"
            placeholder="Your Email"
            className="outline-none border-1 border-neutral-600 p-2 w-full m-auto rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:border-secondary-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            className="outline-none border-1 border-neutral-600 p-2 w-full m-auto rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:border-secondary-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer">
            Continue
          </button>
          <div className="text-secondary-text text-center my-6">
            <span>Don't have an account?</span>
            <a
              href="/signup"
              className="ml-2 text-white underline hover:text-primary"
            >
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
