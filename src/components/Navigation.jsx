/* eslint-disable no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { Menu, X, Settings, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSolarPanel } from "react-icons/fa";

import { navLinks } from "../assets/data";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const footerThreshold = document.documentElement.scrollHeight - 1000;
      setIsDarkSection(scrollY > 700 && scrollY < footerThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants for the Swiss-style reveal
  const menuVariants = {
    closed: {
      x: "100%",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    opened: { x: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  };

  const linkVariants = {
    closed: { y: 80, opacity: 0 },
    opened: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <>
      <nav
        className={`fixed z-40 px-6 py-6 md:px-12 backdrop-blur transition-colors duration-500 w-full flex items-center justify-between ${
          isDarkSection ? "text-zinc-950" : "text-white"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between ">
          {/* LOGO */}
          <div className="flex cursor-pointer items-center">
            <FaSolarPanel size={24} />{" "}
            <span className="ml-1 text-lg tracking-tighter uppercase">
               Solairey
            </span>{" "}
            <sup className="text-xs ml-1">®</sup>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex gap-10">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] uppercase tracking-[0.3em] hover:opacity-50 transition-all"
              >
                {link}
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <button
                className={`p-2.5 rounded-full ${isDarkSection ? "bg-zinc-100" : "bg-white/10"}`}
              >
                <Settings size={16} />
              </button>
              <button
                className={`rounded-full px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${isDarkSection ? "bg-zinc-950 text-white" : "bg-white text-black"}`}
              >
                Get Solar
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 p-2 lg:hidden"
            >
              {isOpen ? (
                <X size={30} className="text-white" />
              ) : (
                <Menu size={30} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 z-40 bg-zinc-950 text-white flex flex-col justify-between p-8 pt-32"
          >
            {/* Background Watermark */}
            <div className="absolute top-20 -right-20 text-[25vh] font-black text-white/5 pointer-events-none rotate-90 origin-top-right">
              GORENO
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-4">
                Navigation
              </span>
              {navLinks.map((link, i) => (
                <div key={link} className="overflow-hidden">
                  <motion.a
                    custom={i}
                    variants={linkVariants}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-6xl font-medium tracking-tighter hover:italic transition-all"
                  >
                    {link}
                  </motion.a>
                </div>
              ))}
            </div>

            {/* Bottom Menu Area */}
            <div className="relative z-10 border-t border-white/10 pt-8 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
                    Contact
                  </span>
                  <p className="text-xs font-medium">hello@goreno.tech</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
                    Office
                  </span>
                  <p className="text-xs font-medium">Zurich, CH</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-black py-6 rounded-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Start Configuration <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
