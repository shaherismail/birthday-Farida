"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useConfigStore } from "@/store/configStore";
import { fadeInUp, staggerContainer } from "@/animations/presets";

// ============================================================
// GallerySection — Phase 4: Cinematic Memories
// ============================================================

const MemoryCard = ({ 
  src, 
  caption, 
}: { 
  src: string; 
  caption: string; 
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative group"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border border-pink-100/50">
        <div className="aspect-[4/5] relative rounded-xl overflow-hidden bg-pink-50">
           {src ? (
             <img src={src} alt={caption} className="w-full h-full object-cover" />
           ) : (
             <div className="absolute inset-0 flex items-center justify-center text-pink-200">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
               </svg>
             </div>
           )}
        </div>
        
        <div className="mt-4 text-center">
          <p className="font-script text-[#c94b57] text-xl">{caption}</p>
        </div>
      </div>
      
      {/* Decorative sparkle on hover */}
      <motion.div 
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-2xl">✨</span>
      </motion.div>
    </motion.div>
  );
};

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use separate selectors to avoid "Maximum update depth exceeded" / "getSnapshot should be cached"
  const memories = useConfigStore((s) => s.memories);
  const galleryTitle = useConfigStore((s) => s.galleryTitle);
  const gallerySubheading = useConfigStore((s) => s.gallerySubheading);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="py-24 bg-[#fffafa] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-content relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-display text-text-dark text-5xl md:text-6xl mb-4"
          >
            {galleryTitle}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="font-script text-[#e8717a] text-2xl md:text-3xl"
          >
            {gallerySubheading}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {memories.map((memory, i) => (
            <MemoryCard 
              key={i} 
              src={memory.image} 
              caption={memory.caption} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
