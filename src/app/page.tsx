"use client";

import React, { useState } from "react";

export default function CampusPulse() {
  const [activeTab, setActiveTab] = useState<"vault" | "snaps" | "radio" | "buddy" | "lost">("vault");

  // --- CRUSH / MATCH VAULT STATE ---
  const [crushLocks, setCrushLocks] = useState([
    { id: 1, name: "Girl in AR Lab (Section B)", lockedAt: "Yesterday", status: "Encrypted 🔒" },
    { id: 2, name: "Badminton player @ Sports Complex", lockedAt: "3 days ago", status: "Encrypted 🔒" },
  ]);
  const [inputCrush, setInputCrush] = useState("");
  const [myRoll, setMyRoll] = useState("");
  const [lockedSuccess, setLockedSuccess] = useState(false);

  // --- SNAPS FEED ---
  const [snaps, setSnaps] = useState([
    {
      id: 1,
      caption: "Golden hour over USAR EDC lawn ✨",
      location: "EDC Lawns",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80",
      likes: 28,
      liked: false,
    },
    {
      id: 2,
      caption: "Floodlights on at Sports Complex 🏸",
      location: "Sports Complex",
      imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80",
      likes: 45,
      liked: true,
    }
  ]);
  const [snapCaption, setSnapCaption] = useState("");
  const [snapLocation, setSnapLocation] = useState("EDC Lawns");
  const [snapImagePreview, setSnapImagePreview] = useState<string | null>(null);

  // --- RADIO FEED ---
  const [radioPosts, setRadioPosts] = useState([
    { id: 1, to: "Hostel 2 Girl in Blue Kurti", song: "Tum Se Hi - Mohit Chauhan", note: "Best vibes yesterday!" },
    { id: 2, to: "Robotics Batch Topper", song: "Starboy - The Weeknd", note: "Assignment bhej de bhai!" },
  ]);
  const [newTo, setNewTo] = useState("");
  const [newSong, setNewSong] = useState("");
  const [newNote, setNewNote] = useState("");

  // --- BUDDY POSTS ---
  const [buddyPosts, setBuddyPosts] = useState([
    { id: 1, place: "🏸 Sports Complex", activity: "Badminton match partner chahiye", time: "Aaj 6:30 PM" },
    { id: 2, place: "☕ EDC Chowk", activity: "Chai + Maggi break after labs", time: "In 15 mins" },
  ]);
  const [place, setPlace] = useState("🏸 Sports Complex");
  const [activity, setActivity] = useState("");
  const [time, setTime] = useState("");

  // --- LOST & FOUND ---
  const [lostItems, setLostItems] = useState([
    { id: 1, type: "Found", title: "Black Earbuds Case (Oppo)", spot: "Sports Complex Court 2" },
    { id: 2, type: "Lost", title: "Hostel Room Key", spot: "Near EDC Chowk" },
  ]);
  const [itemTitle, setItemTitle] = useState("");
  const [itemSpot, setItemSpot] = useState("");

  // Handlers
  const handleLockCrush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCrush || crushLocks.length >= 3) return;
    setCrushLocks([...crushLocks, { id: Date.now(), name: inputCrush, lockedAt: "Just now", status: "Encrypted 🔒" }]);
    setInputCrush("");
    setLockedSuccess(true);
    setTimeout(() => setLockedSuccess(false), 3000);
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSnapImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePostSnap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!snapImagePreview) return;
    setSnaps([{ id: Date.now(), caption: snapCaption || "Campus Snap", location: snapLocation, imageUrl: snapImagePreview, likes: 1, liked: true }, ...snaps]);
    setSnapCaption("");
    setSnapImagePreview(null);
  };

  const handlePostRadio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTo || !newSong) return;
    setRadioPosts([{ id: Date.now(), to: newTo, song: newSong, note: newNote }, ...radioPosts]);
    setNewTo("");
    setNewSong("");
    setNewNote("");
  };

  const handlePostBuddy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity || !time) return;
    setBuddyPosts([{ id: Date.now(), place, activity, time }, ...buddyPosts]);
    setActivity("");
    setTime("");
  };

  const handlePostLost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle || !itemSpot) return;
    setLostItems([{ id: Date.now(), type: "Lost", title: itemTitle, spot: itemSpot }, ...lostItems]);
    setItemTitle("");
    setItemSpot("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center pb-28 selection:bg-rose-500 selection:text-white font-sans">
      <main className="w-full max-w-md px-4 pt-5 flex flex-col gap-4">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              CAMPUS PULSE
            </h1>
            <p className="text-[11px] text-slate-400">USAR East Delhi Campus</p>
          </div>
          <button 
            onClick={() => setActiveTab("vault")}
            className="text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-rose-500/10 animate-pulse"
          >
            💘 Crush Vault
          </button>
        </header>

        {/* --- MAIN TAB: CRUSH MATCH VAULT --- */}
        {activeTab === "vault" && (
          <section className="flex flex-col gap-4">
            {/* Vault Banner */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-950/60 via-pink-950/30 to-slate-900 border border-rose-500/30 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-3xl mb-2 shadow-inner">
                💌
              </div>
              <h2 className="text-base font-extrabold text-white tracking-wide">Campus Secret Vault</h2>
              <p className="text-xs text-rose-200/70 mt-1 max-w-xs leading-relaxed">
                Lock your campus crush silently. Jab tak samne wala bhi tumhe lock nahi karta, tab tak <span className="text-rose-400 font-semibold">kisi ko kuch pata nahi chalega</span>. Zero awkwardness, zero rejection.
              </p>

              <div className="flex gap-2 mt-4 text-[11px] font-bold">
                <span className="bg-slate-950/80 border border-rose-500/30 text-rose-300 px-3 py-1 rounded-xl">
                  🔒 {crushLocks.length}/3 Locked
                </span>
                <span className="bg-slate-950/80 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-xl">
                  ⚡ 100% Zero-Leak
                </span>
              </div>
            </div>

            {/* Lock Input Form */}
            <form onSubmit={handleLockCrush} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  🔐 Lock Someone In
                </span>
                <span className="text-[10px] text-slate-500">Max 3 Persons</span>
              </div>

              <input
                type="text"
                placeholder="Full Name / Roll No / Branch (e.g. AR 1st Year)"
                value={inputCrush}
                onChange={(e) => setInputCrush(e.target.value)}
                disabled={crushLocks.length >= 3}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-rose-500 text-slate-100 transition"
              />

              <button
                type="submit"
                disabled={crushLocks.length >= 3 || !inputCrush}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 font-bold text-xs text-white shadow-lg shadow-rose-500/25 flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.98] transition disabled:opacity-40"
              >
                🔒 Lock In Secretly
              </button>

              {lockedSuccess && (
                <p className="text-[11px] text-emerald-400 text-center font-semibold animate-fade-in">
                  ✅ Successfully Encrypted & Saved in Campus Vault!
                </p>
              )}
            </form>

            {/* Locked List */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-slate-400 px-1">Your Active Secret Locks</span>
              {crushLocks.map((crush, idx) => (
                <div key={crush.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">{crush.name}</p>
                      <p className="text-[10px] text-slate-500">Locked: {crush.lockedAt}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 px-2 py-1 rounded-md text-amber-300/90">
                    {crush.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Secret Admirer Teaser / Monetization */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  🔮 Campus Admirer Radar
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-full font-mono">1 Pending</span>
              </div>
              <p className="text-[11px] text-slate-400">Someone from USAR campus locked your profile in their vault!</p>
              <button className="w-full mt-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition shadow-lg shadow-indigo-600/20">
                Unlock Branch / Lab Clue (₹19 UPI)
              </button>
            </div>
          </section>
        )}

        {/* --- SNAPS TAB --- */}
        {activeTab === "snaps" && (
          <section className="flex flex-col gap-4">
            <form onSubmit={handlePostSnap} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">📸 Drop a Campus Photo</span>
              <div className="relative border-2 border-dashed border-slate-800 rounded-xl p-4 text-center cursor-pointer bg-slate-950">
                <input type="file" accept="image/*" onChange={handleImagePick} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                {snapImagePreview ? (
                  <img src={snapImagePreview} alt="Preview" className="h-36 w-full object-cover rounded-lg" />
                ) : (
                  <span className="text-xs text-slate-400">📷 Tap to select photo from gallery</span>
                )}
              </div>
              <input type="text" placeholder="Caption..." value={snapCaption} onChange={(e) => setSnapCaption(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <button type="submit" disabled={!snapImagePreview} className="w-full py-2.5 rounded-xl bg-cyan-600 font-bold text-xs text-white disabled:opacity-40">Post Snap</button>
            </form>
            {snaps.map((s) => (
              <div key={s.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-2.5 text-xs font-bold text-slate-300">📍 {s.location}</div>
                <img src={s.imageUrl} alt="Snap" className="w-full h-60 object-cover" />
                <div className="p-2.5 flex justify-between items-center text-xs">
                  <p>{s.caption}</p>
                  <span className="text-rose-400 font-bold">❤️ {s.likes}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* --- RADIO TAB --- */}
        {activeTab === "radio" && (
          <section className="flex flex-col gap-4">
            <form onSubmit={handlePostRadio} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">🎵 Dedicate Song</span>
              <input type="text" placeholder="To whom?" value={newTo} onChange={(e) => setNewTo(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <input type="text" placeholder="Song & Artist" value={newSong} onChange={(e) => setNewSong(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <textarea placeholder="Chit message..." rows={2} value={newNote} onChange={(e) => setNewNote(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 resize-none" />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-rose-600 font-bold text-xs text-white">Post Track</button>
            </form>
            {radioPosts.map((p) => (
              <div key={p.id} className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-2xl">
                <p className="text-xs text-slate-400">To: <span className="text-slate-100 font-bold">{p.to}</span></p>
                <p className="text-xs font-bold text-rose-400 mt-1">🎵 {p.song}</p>
                {p.note && <p className="text-[11px] text-slate-300 italic mt-1.5">"{p.note}"</p>}
              </div>
            ))}
          </section>
        )}

        {/* --- BUDDY TAB --- */}
        {activeTab === "buddy" && (
          <section className="flex flex-col gap-4">
            <form onSubmit={handlePostBuddy} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">🤝 Find Company</span>
              <select value={place} onChange={(e) => setPlace(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200">
                <option value="🏸 Sports Complex">🏸 Sports Complex</option>
                <option value="☕ EDC Chowk">☕ EDC Chowk</option>
                <option value="🌿 Main Ground">🌿 Campus Ground</option>
              </select>
              <input type="text" placeholder="Activity (e.g. Badminton match)" value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <input type="text" placeholder="Time (e.g. 6 PM)" value={time} onChange={(e) => setTime(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 font-bold text-xs text-white">Post</button>
            </form>
            {buddyPosts.map((b) => (
              <div key={b.id} className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-emerald-400">{b.place}</p>
                  <p className="text-xs text-slate-200 mt-0.5">{b.activity}</p>
                  <p className="text-[10px] text-slate-500 mt-1">⏰ {b.time}</p>
                </div>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-xs text-emerald-400 font-bold">WhatsApp 💬</a>
              </div>
            ))}
          </section>
        )}

        {/* --- LOST & FOUND TAB --- */}
        {activeTab === "lost" && (
          <section className="flex flex-col gap-4">
            <form onSubmit={handlePostLost} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">🔍 Lost / Found Notice</span>
              <input type="text" placeholder="Item Name" value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <input type="text" placeholder="Spot (e.g. Sports Complex)" value={itemSpot} onChange={(e) => setItemSpot(e.target.value)} className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100" />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">Post</button>
            </form>
            {lostItems.map((l) => (
              <div key={l.id} className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-2xl">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">{l.type}</span>
                <p className="text-xs font-bold text-slate-200 mt-1.5">{l.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">📍 Spot: {l.spot}</p>
              </div>
            ))}
          </section>
        )}

      </main>

      {/* --- BOTTOM FLOATING DOCK (VAULT IN THE CENTER) --- */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 flex justify-around items-center py-2 px-3 z-50">
        
        <button onClick={() => setActiveTab("snaps")} className={`flex flex-col items-center gap-0.5 ${activeTab === "snaps" ? "text-cyan-400 font-bold" : "text-slate-500"}`}>
          <span className="text-lg">📸</span>
          <span className="text-[10px]">Snaps</span>
        </button>

        <button onClick={() => setActiveTab("radio")} className={`flex flex-col items-center gap-0.5 ${activeTab === "radio" ? "text-rose-400 font-bold" : "text-slate-500"}`}>
          <span className="text-lg">📻</span>
          <span className="text-[10px]">Radio</span>
        </button>

        {/* HERO CENTER BUTTON FOR CRUSH VAULT */}
        <button 
          onClick={() => setActiveTab("vault")} 
          className={`relative -top-3 flex flex-col items-center justify-center w-14 h-14 rounded-full border shadow-xl transition-transform active:scale-95 ${
            activeTab === "vault"
              ? "bg-gradient-to-tr from-rose-600 to-pink-500 border-rose-400 shadow-rose-500/40 text-white scale-105"
              : "bg-slate-900 border-rose-500/50 text-rose-400"
          }`}
        >
          <span className="text-2xl">💖</span>
          <span className="text-[9px] font-extrabold tracking-tighter">VAULT</span>
        </button>

        <button onClick={() => setActiveTab("buddy")} className={`flex flex-col items-center gap-0.5 ${activeTab === "buddy" ? "text-emerald-400 font-bold" : "text-slate-500"}`}>
          <span className="text-lg">🤝</span>
          <span className="text-[10px]">Buddy</span>
        </button>

        <button onClick={() => setActiveTab("lost")} className={`flex flex-col items-center gap-0.5 ${activeTab === "lost" ? "text-amber-400 font-bold" : "text-slate-500"}`}>
          <span className="text-lg">🔍</span>
          <span className="text-[10px]">Lost</span>
        </button>

      </nav>
    </div>
  );
}