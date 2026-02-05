import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Zap } from 'lucide-react';

export default function Navigation({ sections, currentSection, onNavigate, hackerMode, setHackerMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const sectionLabels = {
    hero: 'HOME',
    projects: 'PROJECTS',
    skills: 'SKILLS',
    about: 'ABOUT',
    contact: 'CONTACT'
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 hidden md:block">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg transform rotate-45" />
              <div className="absolute inset-1 bg-[#0a0a0f] rounded-lg transform rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black text-cyan-400">{'<>'}</span>
              </div>
            </div>
            <span className="mono text-sm text-gray-400">PORTFOLIO.exe</span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => onNavigate(index)}
                className={`relative px-4 py-2 rounded-full mono text-xs transition-all ${
                  currentSection === index
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {currentSection === index && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{sectionLabels[section]}</span>
              </button>
            ))}
          </div>

          {/* Hacker Mode Toggle */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setHackerMode(!hackerMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              hackerMode
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-gray-900/50 border border-gray-800 text-gray-500 hover:text-gray-300'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span className="mono text-xs">HACKER MODE</span>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg transform rotate-45" />
              <div className="absolute inset-1 bg-[#0a0a0f] rounded-lg transform rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-cyan-400">{'<>'}</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-gray-900/50 border border-gray-800"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 rounded-xl bg-gray-900/95 backdrop-blur-sm border border-gray-800"
            >
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section}
                    onClick={() => {
                      onNavigate(index);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg mono text-sm text-left transition-all ${
                      currentSection === index
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {sectionLabels[section]}
                  </button>
                ))}
                
                <div className="pt-2 border-t border-gray-800">
                  <button
                    onClick={() => setHackerMode(!hackerMode)}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg mono text-sm ${
                      hackerMode
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <Terminal className="w-4 h-4" />
                    HACKER MODE
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Section Indicator Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => onNavigate(index)}
            className="group relative"
          >
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                currentSection === index
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'bg-gray-700 hover:bg-gray-500'
              }`}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity mono text-xs text-gray-400 whitespace-nowrap">
              {sectionLabels[section]}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}