import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Monitor, Cpu, ShieldAlert } from 'lucide-react';

const devJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "Why do Java developers wear glasses? Because they don't C#!",
  "!false - it's funny because it's true.",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code.",
  "The best thing about a Boolean is even if you are wrong, you are only off by a bit."
];

interface TerminalNotificationProps {
  message: string;
  onClear: () => void;
  id: number;
}

function TerminalNotification({ message, onClear, id }: TerminalNotificationProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    let currentText = '';
    const interval = setInterval(() => {
      if (currentText.length < message.length) {
        currentText = message.slice(0, currentText.length + 1);
        setText(currentText);
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9, rotateY: 30 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="w-[300px] md:w-[400px] bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-4 pointer-events-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-900/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] mono text-gray-500 uppercase tracking-widest">system_debug_log</span>
        </div>
        <button onClick={onClear} className="text-gray-600 hover:text-white transition-colors">
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex gap-4">
        <div className="flex-shrink-0">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <Monitor className="w-5 h-5 text-cyan-500" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] mono text-cyan-500">RUNTIME_INFO</span>
          </div>
          <p className="text-sm text-gray-300 mono leading-relaxed">
            {text}
            <span className="w-2 h-4 bg-cyan-500 inline-block ml-1 animate-pulse align-middle" />
          </p>
        </div>
      </div>

      {/* Footer Visual */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-30" />
    </motion.div>
  );
}

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [activeJokes, setActiveJokes] = useState<{ id: number; message: string }[]>([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const addJoke = useCallback(() => {
    const randomJoke = devJokes[Math.floor(Math.random() * devJokes.length)];
    const id = Date.now();
    setActiveJokes(prev => [...prev, { id, message: randomJoke }]);

    // Auto remove after 6 seconds
    setTimeout(() => {
      setActiveJokes(prev => prev.filter(joke => joke.id !== id));
    }, 6000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expectedKey = konamiCode[konamiProgress];

      if (e.code === expectedKey) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);

        if (newProgress === konamiCode.length) {
          setSecretMode(true);
          setKonamiProgress(0);
          addJoke(); // Immediate reward
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, addJoke]);

  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          addJoke();
          return 0;
        }
        return newCount;
      });
    };

    const resetCount = setTimeout(() => setClickCount(0), 500);

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
      clearTimeout(resetCount);
    };
  }, [clickCount, addJoke]);

  return (
    <>
      {/* Custom Global Notifications Container */}
      <div className="fixed top-24 right-4 z-[9999] flex flex-col items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {activeJokes.map((joke) => (
            <TerminalNotification
              key={joke.id}
              id={joke.id}
              message={joke.message}
              onClear={() => setActiveJokes(prev => prev.filter(j => j.id !== joke.id))}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Secret Mode Visual Effects */}
      <AnimatePresence mode="wait">
        {secretMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40"
          >
            {/* Matrix Rain Effect */}
            <div className="absolute inset-0 overflow-hidden bg-green-500/[0.02]">
              {[...Array(30)].map((_skill: unknown, i: number) => ( // Assuming the user intended to add types here for the rain effect
                <motion.div
                  key={i}
                  className="absolute text-green-500/40 mono text-sm"
                  style={{
                    left: `${(i * 100) / 30}%`,
                    fontSize: `${10 + Math.random() * 10}px`
                  }}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{
                    y: '100vh',
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'linear'
                  }}
                >
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </motion.div>
              ))}
            </div>

            {/* Secret Badge UI */}
            <motion.div
              layout
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 p-[1px] rounded-2xl overflow-hidden pointer-events-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-spin-slow opacity-50" style={{ animationDuration: '3s' }} />
              <div className="relative bg-black px-6 py-3 rounded-2xl flex items-center gap-4 border border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-yellow-500" />
                  <span className="text-white font-bold mono tracking-tighter">SECRET_PROTOCOL_01</span>
                </div>
                <div className="w-[1px] h-4 bg-white/20" />
                <button
                  onClick={() => setSecretMode(false)}
                  className="group flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  <span className="mono">TERMINATE</span>
                  <X className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Progress Bar */}
      {konamiProgress > 0 && (
        <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-[10000]">
          <motion.div
            className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
            initial={{ width: 0 }}
            animate={{ width: `${(konamiProgress / konamiCode.length) * 100}%` }}
          />
        </div>
      )}
    </>
  );
}
