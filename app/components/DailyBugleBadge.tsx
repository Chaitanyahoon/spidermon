"use client";

import { motion } from "framer-motion";

export function DailyBugleBadge() {
  return (
    <motion.a
      href="/ChaitanyaPatilResume.pdf"
      download
      initial={{ rotate: -2, y: 0 }}
      whileHover={{ 
        rotate: 0, 
        y: -6, 
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" 
      }}
      whileTap={{ scale: 0.95, y: 0 }}
      className="relative flex items-center justify-between p-5 mt-6 cursor-pointer transition-all duration-300 group rounded-2xl overflow-hidden"
      style={{
        width: "280px",
        height: "170px",
        background: "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(18,28,45,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      {/* Red Press Pass Stripe */}
      <div className="absolute left-0 top-0 w-2 h-full bg-[#E63946]" />
      
      {/* Holographic overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />

      {/* Left Content */}
      <div className="flex flex-col justify-between h-full pl-4 relative z-10 w-2/3">
        <div>
          <h3 className="text-[#E63946] font-black tracking-widest text-[15px] leading-none mb-1 shadow-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            DAILY BUGLE
          </h3>
          <p className="text-zinc-400 text-[8px] uppercase tracking-[0.2em] font-medium" style={{ fontFamily: "var(--font-inter)" }}>
            PRESS CREDENTIAL
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>CHAITANYA PATIL</p>
          <p className="text-zinc-500 text-[9px] uppercase tracking-[0.1em] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Freelance Web Dev</p>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="bg-[#E63946]/10 border border-[#E63946]/20 px-3 py-1.5 rounded flex items-center justify-center transition-colors group-hover:bg-[#E63946] group-hover:border-[#E63946]">
              <span className="text-[#E63946] group-hover:text-white font-black text-[10px] tracking-widest transition-colors" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                DOWNLOAD CV
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Photo/Barcode area */}
      <div className="h-full flex flex-col justify-between items-end relative z-10 w-[80px]">
        {/* Lanyard Hole */}
        <div className="w-10 h-2.5 rounded-full border border-white/20 bg-black/40 mx-auto mt-[-4px]" />
        
        {/* Placeholder Portrait box */}
        <div className="w-[60px] h-[76px] bg-zinc-800/80 mt-2 rounded border border-white/10 overflow-hidden relative mx-auto">
          <div className="absolute inset-0 bg-[#E63946]/10 mix-blend-overlay z-10 pointer-events-none" />
          <img src="/Chaitanya.png" alt="ID Photo" className="w-full h-full object-cover grayscale opacity-90" />
        </div>
        
        {/* Barcode stub */}
        <div className="w-[60px] h-3 mt-auto rounded-sm flex flex-row items-center justify-between opacity-40 mx-auto">
           <div className="w-[2px] h-full bg-white" />
           <div className="w-[1px] h-full bg-white" />
           <div className="w-[2px] h-full bg-white" />
           <div className="w-[4px] h-full bg-white" />
           <div className="w-[1px] h-full bg-white" />
           <div className="w-[2px] h-full bg-white" />
           <div className="w-[3px] h-full bg-white" />
           <div className="w-[1px] h-full bg-white" />
           <div className="w-[2px] h-full bg-white" />
        </div>
      </div>
    </motion.a>
  );
}
