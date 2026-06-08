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

  // Fallbacks to siteConfig
  const personName = (config.personNameDisplay || siteConfig.personNameDisplay || "Aya").trim();
  const profileImage = config.profileImage || siteConfig.profileImage;
  const siteUrl = siteConfig.url || "https://birthday-aya-25th.vercel.app";
  const firstLetter = personName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#ffeef0] via-[#fff5f5] to-[#ffe5e8] flex flex-col items-center justify-start py-12 px-4 md:justify-center overflow-y-auto print:bg-white print:p-0 print:overflow-visible">
      {/* Header Buttons (hidden in print) */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 px-2 print:hidden z-20">
        <button
          onClick={() => window.location.href = "/"}
          className="px-5 py-2.5 bg-white text-[#c94b57] font-bold rounded-2xl shadow-md border border-pink-100 hover:bg-pink-50 transition-all flex items-center gap-2 cursor-pointer active:scale-95 text-sm"
        >
          <span>✨</span> Back to Site
        </button>
        <button
          onClick={() => window.location.href = "/admin"}
          className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-2xl shadow-md hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer active:scale-95 text-sm"
        >
          <span>🛠️</span> Admin Panel
        </button>
      </div>

      {/* Elegant Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-full max-w-md bg-white p-10 pt-16 rounded-[3rem] shadow-2xl border-4 border-double border-amber-200 flex flex-col items-center text-center relative overflow-hidden print:my-auto"
      >
        {/* Ribbon / Bow decoration at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gradient-to-b from-[#e8717a] to-[#c94b57] rounded-b-2xl shadow-md z-10 flex items-center justify-center border-x border-b border-pink-200">
          <span className="text-white text-xs font-bold tracking-widest uppercase">
            {firstLetter}&apos;s Surprise 🎁
          </span>
        </div>

        {/* Decorative background blurs */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="mb-6 z-10">
          <h1 className="font-display text-4xl md:text-5xl text-[#c94b57] tracking-tight mb-3">
            Happy Birthday, {personName}!
          </h1>
          <p className="font-script text-[#e8717a] text-2xl mb-2">
            A Cinematic Celebration 🎂
          </p>
          <p className="text-slate-400 text-xs font-medium max-w-xs mx-auto leading-relaxed">
            Scan the code below with your mobile phone camera to open your special birthday surprise.
          </p>
        </div>

        {/* QR Code Container with dynamic circular profile image */}
        <div className="relative p-6 bg-gradient-to-tr from-[#ffeef0] to-[#fff5f5] rounded-[2.5rem] shadow-inner border border-pink-100/50 mb-6 z-10">
          <div className="bg-white p-5 rounded-[2rem] shadow-lg relative">
            <QRCodeSVG
              value={siteUrl}
              size={210}
              bgColor={"#ffffff"}
              fgColor={"#c94b57"} // Deep pink color for QR code
              level={"H"} // High error correction level to allow logo embedding
              includeMargin={false}
              imageSettings={{
                src: profileImage,
                x: undefined,
                y: undefined,
                height: 44,
                width: 44,
                excavate: true, // Cuts out pixels behind the image
              }}
            />
            {/* CSS Circular Overlay to make the image round and add a gold/white border */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center shadow-md border border-amber-200">
                <img 
                  src={profileImage} 
                  alt={personName}
                  className="w-[42px] h-[42px] rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Call-to-action */}
        <div className="w-full border-t border-slate-100 pt-6 z-10 flex flex-col items-center">
          <div className="flex gap-2 mb-2">
            <span className="text-pink-400 animate-pulse">✨</span>
            <span className="text-[#c94b57] animate-bounce">❤️</span>
            <span className="text-pink-400 animate-pulse">✨</span>
          </div>
          <p className="text-sm font-bold text-slate-700 italic tracking-wider">
            Scan to Open
          </p>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-pink-400 font-medium hover:underline mt-1 cursor-pointer"
          >
            {siteUrl.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </motion.div>

      {/* Action buttons at the bottom (hidden in print) */}
      <div className="mt-8 flex flex-col items-center gap-4 print:hidden z-10">
        <button
          onClick={() => window.print()}
          className="px-8 py-4 bg-gradient-to-r from-[#e8717a] to-[#c94b57] text-white font-bold rounded-2xl shadow-xl shadow-pink-200 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>🖨️</span> Print QR Code Card
        </button>
        <p className="text-xs text-slate-400 max-w-xs text-center leading-relaxed">
          Tip: You can print this card to place it inside a physical gift or gift bag, or take a screenshot to share on WhatsApp.
        </p>
      </div>

      {/* Custom Print Styles */}
      <style jsx global>{`
        @media print {
          html, body {
            background: #fff5f5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Ensure the background and gradient print exactly */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
