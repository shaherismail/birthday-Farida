"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useConfigStore } from "@/store/configStore";
import { siteConfig } from "@/config/site";
import { QRCodeSVG } from "qrcode.react";

export default function QRPage() {
  const config = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use config values, fallback to siteConfig
  const personName = config.personNameDisplay || siteConfig.personNameDisplay;
  const profileImage = config.profileImage || siteConfig.profileImage;
  const siteUrl = siteConfig.url || "https://birthday-aya-25th.vercel.app";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#ffeef0] via-[#fff5f5] to-[#ffe5e8] flex flex-col items-center justify-center p-6 print:bg-white print:p-0">
      {/* Back Button (hidden in print) */}
      <div className="absolute top-6 left-6 flex gap-4 print:hidden">
        <button
          onClick={() => window.location.href = "/"}
          className="px-5 py-2.5 bg-white text-[#c94b57] font-semibold rounded-2xl shadow-sm border border-pink-100 hover:bg-pink-50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <span>✨</span> Back to Site
        </button>
        <button
          onClick={() => window.location.href = "/admin"}
          className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-2xl shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <span>🛠️</span> Admin Panel
        </button>
      </div>

      {/* Elegant Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-pink-100/50 flex flex-col items-center text-center relative overflow-hidden print:shadow-none print:border-none print:my-auto"
      >
        {/* Decorative background orbs */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-100/20 rounded-full blur-2xl" />

        {/* Card Header */}
        <div className="mb-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 rounded-full text-pink-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🎁</span> Birthday Surprise
          </div>
          <h1 className="text-4xl font-extrabold text-[#c94b57] tracking-tight mb-2 font-display">
            Happy Birthday, {personName}!
          </h1>
          <p className="text-slate-500 text-sm font-medium px-4">
            Scan the code below with your mobile camera to open your special birthday surprise.
          </p>
        </div>

        {/* QR Code Frame */}
        <div className="relative p-6 bg-gradient-to-tr from-[#ffe5e8] to-[#fff5f5] rounded-[2rem] shadow-inner border border-pink-100/50 mb-8 z-10">
          <div className="bg-white p-5 rounded-[1.5rem] shadow-md">
            <QRCodeSVG
              value={siteUrl}
              size={220}
              bgColor={"#ffffff"}
              fgColor={"#c94b57"} // Deep pink color for QR code
              level={"H"} // High error correction level to allow logo embedding
              includeMargin={false}
              imageSettings={{
                src: profileImage,
                x: undefined,
                y: undefined,
                height: 48,
                width: 48,
                excavate: true, // Excavate space in the QR code for the profile image
              }}
            />
          </div>
        </div>

        {/* Card Footer Call-to-action */}
        <div className="w-full border-t border-slate-100 pt-6 mt-2 z-10">
          <span className="text-2xl block mb-1">✨ 💖 ✨</span>
          <p className="text-sm font-semibold text-slate-700 italic">
            Scan to Open
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {siteUrl}
          </p>
        </div>
      </motion.div>

      {/* Instructions & Print Action (hidden in print) */}
      <div className="mt-8 text-center print:hidden z-10">
        <button
          onClick={() => window.print()}
          className="px-8 py-3.5 bg-gradient-to-r from-[#e8717a] to-[#c94b57] text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>🖨️</span> Print QR Code Card
        </button>
        <p className="text-xs text-slate-400 mt-4 max-w-xs mx-auto">
          Tip: You can print this card to place it inside a physical gift or gift bag, or take a screenshot to share.
        </p>
      </div>

      {/* Custom Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
}
