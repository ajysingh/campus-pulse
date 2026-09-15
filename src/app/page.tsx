"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Home,
  Radio as RadioIcon,
  Users,
  Search,
  X,
  CheckCircle2,
  Plus,
  Sparkles,
  ShieldCheck,
  Volume2
} from "lucide-react";

export default function CampusPulseProduction() {
  // Splash and Launch States
  const [launching, setLaunching] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Authentication State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authInput, setAuthInput] = useState("");

  // Navigation
  const [activeTab, setActiveTab] = useState<"feed" | "vault" | "radio" | "buddy" | "lost">("feed");

  // Story Viewer
  const [activeStory, setActiveStory] = useState<{ name: string; img: string; spot: string } | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // Interactions
  const [doubleTapHeartId, setDoubleTapHeartId] = useState<number | null>(null);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  // Persistence: Load Local Storage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("cp_user");
    if (savedUser) setCurrentUser(savedUser);

    const savedLocks = localStorage.getItem("cp_locks");
    if (savedLocks) setCrushLocks(JSON.parse(savedLocks));

    // Smooth Launch sequence (2 seconds)
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLaunching(false), 550);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Story Progress Timer
  useEffect(() => {
    if (!activeStory) {
      setStoryProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          setActiveStory(null);
          return 0;
        }
        return prev + 2.5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [activeStory]);

  // Dataset: Campus Stories
  const stories = [
    { id: 1, name: "Your Story", spot: "Upload", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200", isSelf: true },
    { id: 2, name: "USAR EDC", spot: "Campus Lawn", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700", isSelf: false },
    { id: 3, name: "Sports Cplx", spot: "Badminton Arena", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=700", isSelf: false },
    { id: 4, name: "Robotics", spot: "Lab 04", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700", isSelf: false },
    { id: 5, name: "EDC Chowk", spot: "Canteen Hub", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700", isSelf: false },
  ];

  // Dataset: Feed Posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "campus_pulse.usar",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      location: "USAR East Delhi Campus",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80",
      caption: "Golden hour after evening lab sessions. Campus ground hits different at 5:30 PM! 🌅✨",
      likes: 184,
      liked: false,
      saved: false,
      time: "1 HOUR AGO",
      comments: [
        { id: 1, user: "ar_lead", text: "Lighting was sharp today!" },
      ],
    },
    {
      id: 2,
      author: "sports_society_ipu",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      location: "Sports Complex Court 1",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&auto=format&fit=crop&q=80",
      caption: "Evening badminton trials open for all batches under the floodlights. Bring your gear! 🏸🔥",
      likes: 312,
      liked: true,
      saved: true,
      time: "4 HOURS AGO",
      comments: [
        { id: 1, user: "shuttle_ace", text: "Court 2 doubles challenge anyone?" },
      ],
    },
  ]);

  // Dataset: Crush Vault
  const [crushLocks, setCrushLocks] = useState([
    { id: 1, target: "Girl in AR Lab (Section B)", time: "Yesterday", status: "Active Lock" },
  ]);
  const [vaultEntry, setVaultEntry] = useState("");
  const [vaultSuccessMsg, setVaultSuccessMsg] = useState(false);

  // Dataset: Radio & Dedications
  const [radioPosts, setRadioPosts] = useState([
    { id: 1, to: "Hostel 2 in Blue Kurti", track: "Tum Se Hi • Mohit Chauhan", note: "Spotted by the canteen ramp. Great aura!" },
    { id: 2, to: "Robotics Batch Topper", track: "Starboy • The Weeknd", note: "Assignment verify karwa de please." },
  ]);
  const [radioTo, setRadioTo] = useState("");
  const [radioTrack, setRadioTrack] = useState("");
  const [radioNote, setRadioNote] = useState("");

  // Dataset: Buddy Finder
  const [buddyPosts, setBuddyPosts] = useState([
    { id: 1, spot: "🏸 Sports Complex Court 1", title: "Badminton singles partner needed", timing: "Today @ 6:30 PM", host: "Ayush (AR)" },
    { id: 2, spot: "☕ EDC Chowk", title: "Maggi & chai post evening lecture", timing: "In 20 mins", host: "Hostel Boys" },
  ]);
  const [buddySpot, setBuddySpot] = useState("🏸 Sports Complex Court 1");
  const [buddyTitle, setBuddyTitle] = useState("");
  const [buddyTiming, setBuddyTiming] = useState("");

  // Double Tap Heart Handler
  const triggerDoubleTap = (id: number) => {
    setDoubleTapHeartId(id);
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            liked: true,
            likes: p.liked ? p.likes : p.likes + 1,
          };
        }
        return p;
      })
    );
    setTimeout(() => setDoubleTapHeartId(null), 800);
  };

  const toggleHeart = (id: number) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || activeCommentId === null) return;
    setPosts(
      posts.map((p) => {
        if (p.id === activeCommentId) {
          return {
            ...p,
            comments: [...p.comments, { id: Date.now(), user: currentUser || "student_peer", text: commentText }],
          };
        }
        return p;
      })
    );
    setCommentText("");
  };

  const handleVaultSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaultEntry.trim() || crushLocks.length >= 3) return;
    const updated = [...crushLocks, { id: Date.now(), target: vaultEntry, time: "Just now", status: "Active Lock" }];
    setCrushLocks(updated);
    localStorage.setItem("cp_locks", JSON.stringify(updated));
    setVaultEntry("");
    setVaultSuccessMsg(true);
    setTimeout(() => setVaultSuccessMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden antialiased">
      
      {/* 1. LIQUID LAUNCH ANIMATION SCREEN */}
      {launching && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-between py-12 bg-black transition-all duration-500 ${
            fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <div />
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-[28px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[2.5px] shadow-2xl shadow-rose-600/40 animate-pulse">
              <div className="w-full h-full bg-black rounded-[25px] flex items-center justify-center text-4xl">
                💖
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                CAMPUS PULSE
              </h1>
              <p className="text-[11px] font-mono text-zinc-400 mt-1">USAR EAST DELHI CAMPUS</p>
            </div>
            <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden mt-3 relative">
              <div className="w-full h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 animate-shimmer" />
            </div>
          </div>
          <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">GGSIPU EDC OFFICIAL</p>
        </div>
      )}

      {/* 2. FULLSCREEN INSTAGRAM STORY VIEWER */}
      {activeStory && (
        <div className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-between p-3 select-none">
          <div className="w-full max-w-md pt-2 px-1 flex gap-1 z-20">
            <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${storyProgress}%` }}
              />
            </div>
          </div>

          <div className="w-full max-w-md px-3 py-2 flex items-center justify-between z-20">
            <div className="flex items-center gap-2.5">
              <img src={activeStory.img} alt={activeStory.name} className="w-8 h-8 rounded-full border border-white object-cover" />
              <div>
                <p className="text-xs font-bold text-white leading-none">{activeStory.name}</p>
                <p className="text-[10px] text-zinc-300 leading-none mt-1">📍 {activeStory.spot}</p>
              </div>
            </div>
            <button onClick={() => setActiveStory(null)} className="p-1 rounded-full bg-black/40 text-white">
              <X size={20} />
            </button>
          </div>

          <div className="relative w-full max-w-md flex-1 rounded-2xl overflow-hidden my-2 shadow-2xl flex items-center justify-center">
            <img src={activeStory.img} alt="Story Visual" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <p className="absolute bottom-6 left-4 right-4 text-center text-sm font-semibold text-white drop-shadow-md">
              Live broadcast from {activeStory.name}
            </p>
          </div>

          <div className="w-full max-w-md px-2 flex items-center gap-3 z-20">
            <input
              type="text"
              placeholder={`Reply to ${activeStory.name}...`}
              className="flex-1 bg-black/60 border border-white/30 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-zinc-400 outline-none"
            />
            <button className="text-white active:scale-75 transition">
              <Heart size={24} />
            </button>
            <button className="text-white active:scale-75 transition">
              <Send size={22} />
            </button>
          </div>
        </div>
      )}

      {/* 3. AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
              <X size={20} />
            </button>

            <div className="text-center mt-1">
              <h2 className="text-2xl font-serif font-black italic bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                Campus Pulse
              </h2>
              <p className="text-[11px] text-zinc-400 mt-1">USAR EDC Official Portal</p>
            </div>

            <div className="flex bg-zinc-900 p-1 rounded-xl">
              <button
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${authMode === "login" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${authMode === "signup" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}
              >
                Sign Up
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cleanName = authInput ? authInput.split("@")[0] : "verified_student";
                setCurrentUser(cleanName);
                localStorage.setItem("cp_user", cleanName);
                setShowAuthModal(false);
              }}
              className="flex flex-col gap-2.5"
            >
              <input
                type="text"
                placeholder="College Email (@ipu.ac.in) or Username"
                required
                value={authInput}
                onChange={(e) => setAuthInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-zinc-500"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 font-bold text-xs text-white shadow-lg active:scale-95 transition"
              >
                {authMode === "login" ? "Log In" : "Register Student Access"}
              </button>
            </form>

            <button
              onClick={() => {
                setCurrentUser("google_verified");
                localStorage.setItem("cp_user", "google_verified");
                setShowAuthModal(false);
              }}
              className="w-full py-2 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center gap-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 active:scale-95 transition"
            >
              Continue with Google
            </button>
          </div>
        </div>
      )}

      {/* 4. COMMENT BOTTOM SHEET */}
      {activeCommentId !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end">
          <div className="w-full max-w-md bg-zinc-950 border-t border-zinc-800 rounded-t-3xl p-4 flex flex-col max-h-[70vh] h-[480px]">
            <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-3" />
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-3">
              <span className="text-xs font-bold">Campus Discussion</span>
              <button onClick={() => setActiveCommentId(null)} className="text-zinc-400">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
              {posts.find((p) => p.id === activeCommentId)?.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-[10px] font-bold uppercase">
                    {c.user.slice(0, 1)}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white">
                      <span className="font-bold mr-1.5">{c.user}</span>
                      {c.text}
                    </p>
                  </div>
                  <Heart size={13} className="text-zinc-600 mt-1" />
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="border-t border-zinc-900 pt-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-xs text-white outline-none focus:border-zinc-600"
              />
              <button type="submit" disabled={!commentText.trim()} className="text-xs font-bold text-sky-400 disabled:opacity-40">
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. MAIN APP SHELL */}
      <main className="w-full max-w-md pb-24 border-x border-zinc-900 min-h-screen relative flex flex-col bg-black">
        
        {/* TOP APP HEADER */}
        <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black italic font-serif tracking-tight bg-gradient-to-r from-amber-300 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              Campus Pulse
            </h1>
            <span className="text-[9px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded">
              USAR
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab("vault")} className="relative active:scale-90 transition">
              <span className="text-xl">💖</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </button>
            <button onClick={() => setActiveTab("radio")} className="relative active:scale-90 transition">
              <Send size={22} className="text-zinc-100 -rotate-12" />
            </button>
            {currentUser ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  {currentUser.slice(0, 1)}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-xs font-bold bg-white text-black px-3 py-1 rounded-full active:scale-95 transition"
              >
                Log In
              </button>
            )}
          </div>
        </header>

        {/* FEED TAB */}
        {activeTab === "feed" && (
          <div className="flex flex-col">
            {/* STORIES TRAY */}
            <div className="flex items-center gap-3.5 px-3 py-3 overflow-x-auto no-scrollbar border-b border-zinc-900">
              {stories.map((s) => (
                <div
                  key={s.id}
                  onClick={() => !s.isSelf && setActiveStory({ name: s.name, img: s.img, spot: s.spot })}
                  className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer active:scale-95 transition"
                >
                  <div className={`p-[2.5px] rounded-full ${s.isSelf ? "border border-dashed border-zinc-700 relative" : "bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600"}`}>
                    <div className="p-[2px] bg-black rounded-full">
                      <img src={s.img} alt={s.name} className="w-14 h-14 rounded-full object-cover" />
                    </div>
                    {s.isSelf && (
                      <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-0.5 border-2 border-black">
                        <Plus size={12} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-300 font-medium truncate max-w-[62px]">{s.name}</span>
                </div>
              ))}
            </div>

            {/* POSTS LIST */}
            <div className="flex flex-col divide-y divide-zinc-900">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col pt-3 pb-4">
                  <div className="flex items-center justify-between px-3.5 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-amber-400 to-rose-500">
                        <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-black" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-bold text-white">{post.author}</p>
                          {post.verified && <CheckCircle2 size={12} className="text-sky-400 fill-sky-400" />}
                        </div>
                        <p className="text-[10px] text-zinc-400">{post.location}</p>
                      </div>
                    </div>
                    <span className="text-zinc-500 text-xs font-bold">•••</span>
                  </div>

                  <div
                    className="relative aspect-square w-full bg-zinc-950 flex items-center justify-center overflow-hidden cursor-pointer select-none"
                    onDoubleClick={() => triggerDoubleTap(post.id)}
                  >
                    <img src={post.image} alt="Post media" className="w-full h-full object-cover" />
                    {doubleTapHeartId === post.id && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Heart
                          size={110}
                          className="text-white fill-rose-500 drop-shadow-[0_0_35px_rgba(244,63,94,0.9)] animate-in zoom-in-50 duration-200"
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-3.5 pt-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleHeart(post.id)} className="active:scale-75 transition">
                          <Heart size={24} className={post.liked ? "fill-rose-500 text-rose-500" : "text-zinc-100"} />
                        </button>
                        <button onClick={() => setActiveCommentId(post.id)} className="active:scale-75 transition">
                          <MessageCircle size={24} className="text-zinc-100 -rotate-90" />
                        </button>
                        <button className="active:scale-75 transition">
                          <Send size={22} className="text-zinc-100 -rotate-12" />
                        </button>
                      </div>
                      <button onClick={() => setPosts(posts.map((p) => (p.id === post.id ? { ...p, saved: !p.saved } : p)))}>
                        <Bookmark size={23} className={post.saved ? "fill-white text-white" : "text-zinc-100"} />
                      </button>
                    </div>

                    <div className="text-xs font-bold text-zinc-100">{post.likes.toLocaleString()} likes</div>
                    <div className="text-xs leading-relaxed text-zinc-200">
                      <span className="font-bold text-white mr-1.5">{post.author}</span>
                      {post.caption}
                    </div>

                    {post.comments.length > 0 && (
                      <button onClick={() => setActiveCommentId(post.id)} className="text-[11px] text-zinc-500 text-left font-medium">
                        View all {post.comments.length} comments
                      </button>
                    )}
                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">{post.time}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* VAULT TAB */}
        {activeTab === "vault" && (
          <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/70 via-purple-950/50 to-black border border-rose-500/30 text-center flex flex-col items-center shadow-2xl relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px] mb-3 shadow-lg shadow-rose-500/30">
                <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-3xl">
                  💖
                </div>
              </div>
              <h2 className="text-lg font-black text-white">Campus Secret Match Vault</h2>
              <p className="text-xs text-rose-200/80 mt-1 max-w-xs leading-relaxed">
                Secretly lock your campus crush. Jab tak mutual match nahi hota, dono identities zero-leak encryption ke sath sealed rehti hain.
              </p>
              <div className="flex gap-2 mt-4 text-[11px] font-bold">
                <span className="bg-black/60 border border-rose-500/40 text-rose-300 px-3 py-1 rounded-full">
                  🔒 {crushLocks.length}/3 Locked
                </span>
                <span className="bg-black/60 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> Encrypted
                </span>
              </div>
            </div>

            <form onSubmit={handleVaultSave} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col gap-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={14} /> Secret Entry
              </span>
              <input
                type="text"
                placeholder="Full Name / Roll No / Branch (e.g. AR 1st Year)"
                value={vaultEntry}
                onChange={(e) => setVaultEntry(e.target.value)}
                disabled={crushLocks.length >= 3}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                disabled={crushLocks.length >= 3 || !vaultEntry}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 font-bold text-xs text-white shadow-lg shadow-rose-600/30 active:scale-95 transition disabled:opacity-40"
              >
                Lock In Vault Silently
              </button>
              {vaultSuccessMsg && (
                <p className="text-[11px] text-emerald-400 text-center font-semibold">
                  ✅ Successfully Encrypted & Saved Locally!
                </p>
              )}
            </form>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-zinc-500 px-1">Active Encrypted Vaults</span>
              {crushLocks.map((c, i) => (
                <div key={c.id} className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center">
                      #{i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">{c.target}</p>
                      <p className="text-[10px] text-zinc-500">Locked: {c.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-1 rounded-md">
                    Active 🔒
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RADIO TAB */}
        {activeTab === "radio" && (
          <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col gap-3">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">🎵 Dedicate Song Chit</span>
              <input
                type="text"
                placeholder="To whom? (e.g. Student in AR Lab)"
                value={radioTo}
                onChange={(e) => setRadioTo(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <input
                type="text"
                placeholder="Song Title & Artist (e.g. Tum Se Hi - Pritam)"
                value={radioTrack}
                onChange={(e) => setRadioTrack(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <textarea
                placeholder="Message note..."
                rows={2}
                value={radioNote}
                onChange={(e) => setRadioNote(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none resize-none"
              />
              <button
                onClick={() => {
                  if (!radioTo || !radioTrack) return;
                  setRadioPosts([{ id: Date.now(), to: radioTo, track: radioTrack, note: radioNote }, ...radioPosts]);
                  setRadioTo("");
                  setRadioTrack("");
                  setRadioNote("");
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-xs text-white active:scale-95 shadow-md shadow-pink-600/30"
              >
                Broadcast Radio Track
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {radioPosts.map((r) => (
                <div key={r.id} className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-2xl">
                  <p className="text-xs text-zinc-400">To: <span className="text-white font-bold">{r.to}</span></p>
                  <p className="text-xs font-bold text-pink-400 mt-1 flex items-center gap-1.5">
                    <Volume2 size={13} /> {r.track}
                  </p>
                  {r.note && <p className="text-xs text-zinc-300 italic mt-1.5 bg-zinc-900/60 p-2 rounded-xl">"{r.note}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUDDY TAB */}
        {activeTab === "buddy" && (
          <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col gap-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🤝 Broadcast Buddy Request</span>
              <select
                value={buddySpot}
                onChange={(e) => setBuddySpot(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-200 outline-none"
              >
                <option value="🏸 Sports Complex Court 1">🏸 Sports Complex Court 1</option>
                <option value="☕ EDC Chowk">☕ EDC Chowk</option>
                <option value="🌿 Campus Lawn">🌿 Campus Lawn</option>
                <option value="📚 Central Library">📚 Central Library</option>
              </select>
              <input
                type="text"
                placeholder="Activity description..."
                value={buddyTitle}
                onChange={(e) => setBuddyTitle(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <input
                type="text"
                placeholder="Timing (e.g. 6:30 PM Today)"
                value={buddyTiming}
                onChange={(e) => setBuddyTiming(e.target.value)}
                className="w-full text-xs bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <button
                onClick={() => {
                  if (!buddyTitle || !buddyTiming) return;
                  setBuddyPosts([{ id: Date.now(), spot: buddySpot, title: buddyTitle, timing: buddyTiming, host: "You" }, ...buddyPosts]);
                  setBuddyTitle("");
                  setBuddyTiming("");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 font-bold text-xs text-white active:scale-95 shadow-lg shadow-emerald-600/30"
              >
                Broadcast Request
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {buddyPosts.map((b) => (
                <div key={b.id} className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                      {b.spot}
                    </span>
                    <p className="text-xs font-bold text-white mt-1.5">{b.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-1">⏰ {b.timing} • {b.host}</p>
                  </div>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Hey, saw your Campus Pulse post: "${b.title}". Let's connect!`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-400 px-3 py-1.5 bg-emerald-950/50 border border-emerald-800 rounded-xl active:scale-95 transition"
                  >
                    Connect
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOST & FOUND TAB */}
        {activeTab === "lost" && (
          <div className="p-4 flex flex-col gap-3 animate-in fade-in duration-300">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🔍 Campus Lost & Found Board</span>
            <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col gap-1">
              <span className="w-fit text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">FOUND</span>
              <p className="text-xs font-bold text-white">Black Earbuds Case (Oppo)</p>
              <p className="text-[11px] text-zinc-400">📍 Sports Complex Court 2 benches</p>
              <p className="text-[10px] text-zinc-500 mt-1">Collect from Sports Complex Incharge.</p>
            </div>
            <div className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col gap-1">
              <span className="w-fit text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-900 px-2 py-0.5 rounded">LOST</span>
              <p className="text-xs font-bold text-white">Hostel Room Key #204</p>
              <p className="text-[11px] text-zinc-400">📍 Near EDC Chowk evening time</p>
              <p className="text-[10px] text-zinc-500 mt-1">Found anyone please hand over at hostel main reception.</p>
            </div>
          </div>
        )}

        {/* BOTTOM NAV DOCK */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/95 backdrop-blur-2xl border-t border-zinc-900 flex justify-around items-center py-2 px-3 z-40">
          <button onClick={() => setActiveTab("feed")} className="p-2 active:scale-75 transition">
            <Home size={24} className={activeTab === "feed" ? "text-white fill-white" : "text-zinc-500"} />
          </button>

          <button onClick={() => setActiveTab("buddy")} className="p-2 active:scale-75 transition">
            <Users size={24} className={activeTab === "buddy" ? "text-emerald-400" : "text-zinc-500"} />
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className="p-[2.5px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-xl shadow-rose-600/40 -top-2 relative active:scale-90 transition"
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-xl">
              💖
            </div>
          </button>

          <button onClick={() => setActiveTab("radio")} className="p-2 active:scale-75 transition">
            <RadioIcon size={24} className={activeTab === "radio" ? "text-pink-500" : "text-zinc-500"} />
          </button>

          <button onClick={() => setActiveTab("lost")} className="p-2 active:scale-75 transition">
            <Search size={24} className={activeTab === "lost" ? "text-amber-400" : "text-zinc-500"} />
          </button>
        </nav>

      </main>
    </div>
  );
}