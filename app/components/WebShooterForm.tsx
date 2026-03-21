"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, MouseEvent as ReactMouseEvent, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface WebString {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function WebShooterForm() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [webs, setWebs] = useState<WebString[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const webCounter = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMiles = mounted && theme === "theme-1610";

  // Creates the visual spider-web line effect
  const shootWeb = (e: ReactMouseEvent, fieldId: string) => {
    if (!formRef.current || focusedField === fieldId) return;

    const formRect = formRef.current.getBoundingClientRect();
    
    // Origin is mouse click position relative to form
    const startX = e.clientX - formRect.left;
    const startY = e.clientY - formRect.top;

    // Target is rough estimation of the label we're clicking
    // To make it easy, we aim at the top-left of the bounding box
    const targetEl = document.getElementById(`label-${fieldId}`);
    let endX = startX;
    let endY = startY - 40; // Default pull up

    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      endX = targetRect.left - formRect.left + targetRect.width / 2;
      endY = targetRect.top - formRect.top + targetRect.height / 2;
    }

    const newWeb: WebString = {
      id: webCounter.current++,
      startX,
      startY,
      endX,
      endY,
    };

    setWebs((prev) => [...prev, newWeb]);
    setFocusedField(fieldId);

    // Remove web after animation completes
    setTimeout(() => {
      setWebs((prev) => prev.filter((w) => w.id !== newWeb.id));
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "b21a7343-9703-4b22-8a08-4854963e2a98";

    // If no access key is configured at all, fallback to UI physics simulation
    if (!accessKey) {
      console.warn("NEXT_PUBLIC_WEB3FORMS_KEY missing. Simulating form submission.");
      setTimeout(() => {
        setIsSending(false);
        setIsSent(true);
      }, 2000);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setIsSent(true);
      } else {
        console.error("Web3Forms error:", data);
        alert("Transmission failed. Please try again later.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Network error. Could not shoot web signal.");
    } finally {
      setIsSending(false);
    }
  };

  // Styling palette
  const accentColor = isMiles ? "#ffe500" : "#E63946";
  const webColor = isMiles ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)";
  
  if (isSent) {
    return (
      <div className="relative z-20 w-full max-w-xl mx-auto p-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 mb-6 rounded-full flex items-center justify-center border-4"
          style={{ borderColor: accentColor }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </motion.div>
        <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Message Delivered
        </h3>
        <p className="text-zinc-400" style={{ fontFamily: "var(--font-inter)" }}>
          Your signal has been received. I'll swing by your inbox shortly.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={formRef} 
      className="relative z-20 w-full max-w-xl mx-auto mt-8 cursor-crosshair"
    >
      {/* Drawing Overlay for Web Threads */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" style={{ overflow: 'visible' }}>
        <AnimatePresence>
          {webs.map((web) => (
            <motion.line
              key={web.id}
              x1={web.startX}
              y1={web.startY}
              x2={web.endX}
              y2={web.endY}
              stroke={webColor}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
        
        {/* Massive Submission Web Blast */}
        {isSending && (
          <motion.circle
             cx="50%"
             cy="50%"
             r="10"
             fill="transparent"
             stroke={webColor}
             strokeWidth="2"
             initial={{ r: 0, opacity: 1, strokeWidth: 10 }}
             animate={{ r: 800, opacity: 0, strokeWidth: 0 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
      </svg>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
        
        {/* INPUT: NAME */}
        <div className="relative group" onMouseDown={(e) => shootWeb(e, "name")}>
          <motion.label
            id="label-name"
            htmlFor="name"
            animate={{
              y: focusedField === "name" ? -28 : 14,
              scale: focusedField === "name" ? 0.85 : 1,
              color: focusedField === "name" ? accentColor : "#a1a1aa",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-4 font-bold tracking-widest uppercase origin-left pointer-events-none z-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Name
          </motion.label>
          <input 
            type="text" 
            id="name"
            name="name"
            required
            onBlur={() => {
              const el = document.getElementById("name") as HTMLInputElement;
              if (!el.value) setFocusedField(null);
            }}
            className={`w-full bg-zinc-900/50 border px-4 py-3 text-white outline-none transition-colors duration-300 font-medium z-0 relative ${isMiles ? "rounded-none comic-border border-zinc-700 focus:border-[#ffe500]" : "rounded-xl border-white/10 focus:border-[#E63946] focus:bg-zinc-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* INPUT: EMAIL */}
        <div className="relative group" onMouseDown={(e) => shootWeb(e, "email")}>
          <motion.label
            id="label-email"
            htmlFor="email"
            animate={{
              y: focusedField === "email" ? -28 : 14,
              scale: focusedField === "email" ? 0.85 : 1,
              color: focusedField === "email" ? accentColor : "#a1a1aa"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-4 font-bold tracking-widest uppercase origin-left pointer-events-none z-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Email Signal
          </motion.label>
          <input 
            type="email" 
            id="email"
            name="email"
            required
            onBlur={() => {
              const el = document.getElementById("email") as HTMLInputElement;
              if (!el.value) setFocusedField(null);
            }}
            className={`w-full bg-zinc-900/50 border px-4 py-3 text-white outline-none transition-colors duration-300 font-medium z-0 relative ${isMiles ? "rounded-none comic-border border-zinc-700 focus:border-[#ffe500]" : "rounded-xl border-white/10 focus:border-[#E63946] focus:bg-zinc-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        {/* TEXTAREA: MESSAGE */}
        <div className="relative group" onMouseDown={(e) => shootWeb(e, "message")}>
          <motion.label
            id="label-message"
            htmlFor="message"
            animate={{
              y: focusedField === "message" ? -28 : 14,
              scale: focusedField === "message" ? 0.85 : 1,
              color: focusedField === "message" ? accentColor : "#a1a1aa"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-4 font-bold tracking-widest uppercase origin-left pointer-events-none z-10"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Project Details
          </motion.label>
          <textarea 
            id="message"
            name="message"
            required
            rows={5}
            onBlur={() => {
              const el = document.getElementById("message") as HTMLTextAreaElement;
              if (!el.value) setFocusedField(null);
            }}
            className={`w-full bg-zinc-900/50 border px-4 py-4 text-white outline-none transition-colors duration-300 font-medium z-0 relative resize-none ${isMiles ? "rounded-none comic-border border-zinc-700 focus:border-[#ffe500]" : "rounded-xl border-white/10 focus:border-[#E63946] focus:bg-zinc-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]"}`}
            style={{ fontFamily: "var(--font-inter)", paddingTop: focusedField === "message" ? "1rem" : "2.5rem" }}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <motion.button
          type="submit"
          disabled={isSending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-full overflow-hidden flex items-center justify-center gap-3 px-8 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 ${isSending ? "opacity-80 cursor-wait" : ""} ${isMiles ? "bg-[#ffe500] text-black shadow-[4px_4px_0px_#fff]" : "bg-[#E63946] text-white rounded-full shadow-[0_10px_30px_rgba(230,57,70,0.3)] hover:shadow-[0_10px_40px_rgba(230,57,70,0.5)]"}`}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {isSending ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Shooting Web...
            </motion.span>
          ) : (
            <>
              {isMiles ? "THWIP MESSAGE!" : "SEND SIGNAL"}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
