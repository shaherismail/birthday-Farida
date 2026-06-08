"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useConfigStore } from "@/store/configStore";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("identity");
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  const config = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLogged(true);
    } else {
      alert("Wrong password!");
    }
  };

  if (!mounted) return null;

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Enter Access Key"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-pink-400 outline-none transition-all text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-pink-500 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-600 transition-all active:scale-95 text-lg">
              Unlock Dashboard 🔓
            </button>
          </form>
          <p className="mt-6 text-center text-slate-400 text-sm">Key: admin123</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-pink-500">Admin</span> Dashboard
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "identity", label: "Identity", icon: "👤" },
            { id: "messages", label: "Messages", icon: "📝" },
            { id: "gallery", label: "Gallery", icon: "📸" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-lg ${
                activeTab === tab.id ? "bg-pink-50 text-pink-600 font-bold shadow-sm" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-100">
          <button onClick={() => setIsLogged(false)} className="w-full flex items-center gap-3 px-6 py-3 text-slate-400 hover:text-red-500 transition-colors">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 p-8 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Control Panel</h1>
            <p className="text-slate-500">Manage everything about the birthday site</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.open('/qr', '_blank')}
              className="px-6 py-3 bg-pink-50 text-[#c94b57] font-semibold rounded-2xl hover:bg-pink-100 transition-all border border-pink-100"
            >
              QR Code Card 🎁
            </button>
            <button 
              onClick={() => window.open('/', '_blank')}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Preview Site
            </button>
            <button 
              onClick={() => alert('Changes are saved automatically!')}
              className="px-6 py-3 bg-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </header>

        <div className="p-10 max-w-5xl mx-auto">
          {activeTab === "identity" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                  <span className="p-2 bg-blue-50 rounded-lg">👤</span> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Birthday Person&apos;s Name</label>
                    <input 
                      type="text" 
                      value={config.personNameDisplay} 
                      onChange={(e) => config.updateConfig({ personNameDisplay: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Age</label>
                    <input 
                      type="text" 
                      value={config.birthdayAge} 
                      onChange={(e) => config.updateConfig({ birthdayAge: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Birthday Date Display (e.g. 3 Feb)</label>
                    <input 
                      type="text" 
                      value={config.birthdayDate} 
                      onChange={(e) => config.updateConfig({ birthdayDate: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Profile Image URL (The circle image)</label>
                    <input 
                      type="text" 
                      value={config.profileImage} 
                      onChange={(e) => config.updateConfig({ profileImage: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                      placeholder="/images/profile.jpg"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                  <span className="p-2 bg-purple-50 rounded-lg">📝</span> Cinematic Copy
                </h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-2">Hero Line 1 (Happy)</label>
                      <input 
                        type="text" 
                        value={config.heroLine1} 
                        onChange={(e) => config.updateConfig({ heroLine1: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-2">Hero Line 2 (Birthday)</label>
                      <input 
                        type="text" 
                        value={config.heroLine2} 
                        onChange={(e) => config.updateConfig({ heroLine2: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Cake Scene Heading</label>
                    <input 
                      type="text" 
                      value={config.cakeHeading} 
                      onChange={(e) => config.updateConfig({ cakeHeading: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Card Cover Teaser</label>
                    <input 
                      type="text" 
                      value={config.cardTeaser} 
                      onChange={(e) => config.updateConfig({ cardTeaser: e.target.value })}
                      className="w-full p-4 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Main Card Message</label>
                    <textarea 
                      rows={6} 
                      value={config.cardMessage}
                      onChange={(e) => config.updateConfig({ cardMessage: e.target.value })}
                      className="w-full p-6 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none resize-none text-lg leading-relaxed"
                    ></textarea>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Final Section Message</label>
                    <textarea 
                      rows={3} 
                      value={config.finalMessage}
                      onChange={(e) => config.updateConfig({ finalMessage: e.target.value })}
                      className="w-full p-6 bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none resize-none text-lg leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <span className="p-2 bg-orange-50 rounded-lg">📸</span> Photo Gallery
                  </h3>
                  <button 
                    onClick={() => config.updateConfig({ memories: [...config.memories, { image: "", caption: "New Memory" }] })}
                    className="px-6 py-2 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all"
                  >
                    + Add New Photo
                  </button>
                </div>

                <div className="space-y-6 mb-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Section Header</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-2">Gallery Title</label>
                      <input 
                        type="text" 
                        value={config.galleryTitle} 
                        onChange={(e) => config.updateConfig({ galleryTitle: e.target.value })}
                        className="w-full p-4 bg-white border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-600 block mb-2">Gallery Subheading</label>
                      <input 
                        type="text" 
                        value={config.gallerySubheading} 
                        onChange={(e) => config.updateConfig({ gallerySubheading: e.target.value })}
                        className="w-full p-4 bg-white border-none ring-1 ring-slate-200 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none text-lg" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {config.memories.map((memory, index) => (
                    <div key={index} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                      <div className="aspect-video bg-slate-200 rounded-2xl overflow-hidden relative group">
                        {memory.image ? (
                          <img src={memory.image} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-400 italic">No image URL</div>
                        )}
                        <button 
                          onClick={() => {
                            const newMemories = [...config.memories];
                            newMemories.splice(index, 1);
                            config.updateConfig({ memories: newMemories });
                          }}
                          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Image URL" 
                          value={memory.image}
                          onChange={(e) => {
                            const newMemories = [...config.memories];
                            newMemories[index].image = e.target.value;
                            config.updateConfig({ memories: newMemories });
                          }}
                          className="w-full p-3 bg-white border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none" 
                        />
                        <input 
                          type="text" 
                          placeholder="Caption" 
                          value={memory.caption}
                          onChange={(e) => {
                            const newMemories = [...config.memories];
                            newMemories[index].caption = e.target.value;
                            config.updateConfig({ memories: newMemories });
                          }}
                          className="w-full p-3 bg-white border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-pink-300 outline-none" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
