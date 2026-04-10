import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Monitor, Cpu, ShieldAlert, Coffee, Bug, Code2, Laugh } from 'lucide-react';

const devJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "Why do Java developers wear glasses? Because they don't C#!",
  "!false — it's funny because it's true.",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code.",
  "The best thing about a Boolean is even if you are wrong, you are only off by a bit.",
  "How many programmers does it take to change a light bulb? None. That's a hardware problem.",
  "A programmer's wife tells him: 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.' He comes home with 12 loaves.",
  "['hip','hip'] — hip hip array! 🎉",
  "There's no place like 127.0.0.1 🏠",
  "It works on my machine ¯\\_(ツ)_/¯",
  "I don't always test my code, but when I do, I do it in production. 🔥",
  "Git commit -m 'fixed it for real this time' — narrator: he didn't.",
  "Weeks of coding can save you hours of planning.",
  "My code doesn't have bugs, it has surprise features ✨",
  "I have a joke about UDP, but I'm not sure if you'll get it.",
  "To understand recursion, you must first understand recursion.",
  "Programmer: A machine that turns ☕ into code.",
];

const jokeIcons = [Coffee, Bug, Code2, Laugh, Terminal, Monitor, Cpu];

interface TerminalNotificationProps {
  message: string;
  onClear: () => void;
  id: number;
  variant: 'slide' | 'toast' | 'glitch';
  iconIndex: number;
}

function TerminalNotification({ message, onClear, id, variant, iconIndex }: TerminalNotificationProps) {
  const [text, setText] = useState('');
  const Icon = jokeIcons[iconIndex % jokeIcons.length];

  useEffect(() => {
    let currentText = '';
    const interval = setInterval(() => {
      if (currentText.length < message.length) {
        currentText = message.slice(0, currentText.length + 1);
        setText(currentText);
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [message]);

  // Auto-dismiss progress bar
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const start = Date.now();
    const duration = 8000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining > 0) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const variants = {
    slide: {
      initial: { opacity: 0, x: 120, scale: 0.8 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 80, scale: 0.8, transition: { duration: 0.3 } },
    },
    toast: {
      initial: { opacity: 0, y: 60, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -30, scale: 0.9, transition: { duration: 0.3 } },
    },
    glitch: {
      initial: { opacity: 0, x: -120, rotateY: 45, scale: 0.7 },
      animate: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
      exit: { opacity: 0, scale: 0.5, rotateY: -30, transition: { duration: 0.25 } },
    },
  };

  const v = variants[variant];
  const accentColors = ['cyan', 'purple', 'pink', 'green'];
  const accent = accentColors[iconIndex % accentColors.length];
  const accentHex = { cyan: '#06b6d4', purple: '#8b5cf6', pink: '#ff006e', green: '#00ff88' }[accent]!;

  return (
    <motion.div
      layout
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      className="w-[320px] md:w-[420px] mb-3 pointer-events-auto"
      style={{ perspective: '800px' }}
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: 'rgba(8, 8, 20, 0.95)',
          border: `1px solid ${accentHex}30`,
          boxShadow: `0 0 40px ${accentHex}15, 0 20px 50px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Top accent line */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${accentHex}, transparent)` }} />

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[10px] mono uppercase tracking-widest ml-2" style={{ color: `${accentHex}80` }}>
              dev_humor.exe
            </span>
          </div>
          <button
            onClick={onClear}
            className="text-gray-600 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex gap-4">
          <div className="flex-shrink-0">
            <div
              className="p-2.5 rounded-lg"
              style={{
                background: `${accentHex}10`,
                border: `1px solid ${accentHex}25`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: accentHex }} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: accentHex }}
              />
              <span className="text-[10px] mono uppercase tracking-widest" style={{ color: accentHex }}>
                runtime_joke
              </span>
            </div>
            <p className="text-sm text-gray-300 mono leading-relaxed">
              {text}
              <span
                className="w-[2px] h-4 inline-block ml-1 animate-pulse align-middle"
                style={{ background: accentHex }}
              />
            </p>
          </div>
        </div>

        {/* Auto-dismiss progress bar */}
        <div className="h-[2px] w-full" style={{ background: `${accentHex}10` }}>
          <div
            className="h-full transition-none"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentHex}80, ${accentHex})`,
              boxShadow: `0 0 8px ${accentHex}40`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [activeJokes, setActiveJokes] = useState<{ id: number; message: string; variant: 'slide' | 'toast' | 'glitch'; iconIndex: number }[]>([]);
  const jokeIndexRef = useRef(0);
  const lastJokeTimeRef = useRef(0);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const addJoke = useCallback(() => {
    // Prevent spam — minimum 4 seconds between jokes
    const now = Date.now();
    if (now - lastJokeTimeRef.current < 4000) return;
    lastJokeTimeRef.current = now;

    const variants: ('slide' | 'toast' | 'glitch')[] = ['slide', 'toast', 'glitch'];
    const joke = devJokes[jokeIndexRef.current % devJokes.length];
    jokeIndexRef.current += 1;
    const id = now;
    const variant = variants[Math.floor(Math.random() * variants.length)];
    const iconIndex = Math.floor(Math.random() * jokeIcons.length);

    setActiveJokes(prev => {
      // Keep max 2 notifications visible at once
      const limited = prev.length >= 2 ? prev.slice(1) : prev;
      return [...limited, { id, message: joke, variant, iconIndex }];
    });

    // Auto remove after 8 seconds
    setTimeout(() => {
      setActiveJokes(prev => prev.filter(j => j.id !== id));
    }, 8000);
  }, []);

  // ─── AUTO JOKE TIMER: Shows jokes randomly every 25-45 seconds ───
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 25000 + Math.random() * 20000; // 25-45 seconds
      return setTimeout(() => {
        addJoke();
        timerRef.current = scheduleNext();
      }, delay);
    };

    // First joke appears after 12-18 seconds (give user time to settle in)
    const initialDelay = 12000 + Math.random() * 6000;
    let timerRef = { current: setTimeout(() => {
      addJoke();
      timerRef.current = scheduleNext();
    }, initialDelay) };

    return () => clearTimeout(timerRef.current);
  }, [addJoke]);

  // ─── Konami Code ───
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expectedKey = konamiCode[konamiProgress];
      if (e.code === expectedKey) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        if (newProgress === konamiCode.length) {
          setSecretMode(true);
          setKonamiProgress(0);
          addJoke();
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, addJoke]);

  // ─── Triple-click joke ───
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
      {/* Notification Container — fixed position, always visible */}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {activeJokes.map((joke) => (
            <TerminalNotification
              key={joke.id}
              id={joke.id}
              message={joke.message}
              variant={joke.variant}
              iconIndex={joke.iconIndex}
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
              {[...Array(30)].map((_skill: unknown, i: number) => (
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
