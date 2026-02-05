import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Cpu, Database, Globe, Terminal, Orbit, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    name: 'Frontend',
    icon: Globe,
    color: '#00f0ff',
    description: 'Immersive UI/UX Engineering with high-performance frameworks.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'FramerMotion']
  },
  {
    name: 'Backend',
    icon: Database,
    color: '#8b5cf6',
    description: 'Scalable server-side architectures and real-time data pipelines.',
    skills: ['Node.js', 'Express', 'MongoDB', 'TypeScript', 'Socket.io']
  },
  {
    name: 'Intelligence',
    icon: Cpu,
    color: '#ff006e',
    description: 'Integrating LLMs, Neural Networks, and AI-driven automation.',
    skills: ['GenAI', 'OpenAI', 'Gemini', 'OpenAI API', 'Groq']
  },
  {
    name: 'Ecosystem',
    icon: Terminal,
    color: '#00ff88',
    description: 'Modern DevOps workflows and cloud infrastructure mastery.',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux', 'Github Actions', 'NPM', 'Vite']
  }
];

interface FloatingSkillProps {
  name: string;
  color: string;
  index: number;
  isActive: boolean;
}

function FloatingSkill({ name, color, index, isActive }: FloatingSkillProps) {
  const randomX = useMemo(() => Math.random() * 60 - 30, []);
  const randomY = useMemo(() => Math.random() * 60 - 30, []);
  const duration = useMemo(() => 4 + Math.random() * 6, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1.3 : 1,
        x: isActive ? randomX * 3.5 : randomX,
        y: isActive ? randomY * 3.5 : randomY,
      }}
      whileHover={{ scale: 1.5, zIndex: 100, opacity: 1 }}
      className="px-5 py-2.5 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/20 text-sm mono cursor-pointer whitespace-nowrap font-black tracking-tight"
      style={{
        borderColor: isActive ? `${color}` : 'rgba(255,255,255,0.3)',
        color: isActive ? '#fff' : '#aaa',
        boxShadow: isActive ? `0 0 40px ${color}60, inset 0 0 15px ${color}30` : '0 10px 30px rgba(0,0,0,0.8)',
        background: isActive ? `linear-gradient(135deg, ${color}30, transparent)` : 'rgba(15,15,15,0.9)'
      }}
      transition={{
        x: { duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        y: { duration: duration * 1.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 400, damping: 10 }
      }}
    >
      {name}
    </motion.div>
  );
}

interface CategoryNodeProps {
  category: typeof skillCategories[0];
  activeCategory: string | null;
  setActiveCategory: (name: string | null) => void;
}

function CategoryNode({ category, activeCategory, setActiveCategory }: CategoryNodeProps) {
  const isActive = activeCategory === category.name;
  const isAnyActive = activeCategory !== null;
  const Icon = category.icon;

  return (
    <div className="relative flex flex-col items-center">
      {/* Dynamic Background Nebula for each node */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          scale: isActive ? [1, 1.4, 1] : 1,
          opacity: isActive ? 0.7 : 0.4
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div
          className="w-48 h-48 md:w-64 md:h-64 rounded-full blur-[80px]"
          style={{ background: category.color }}
        />
      </motion.div>

      <motion.button
        layout
        onClick={() => setActiveCategory(isActive ? null : category.name)}
        className={`relative z-20 w-56 h-56 md:w-72 md:h-72 rounded-full flex flex-col items-center justify-center transition-all duration-700 ${isAnyActive && !isActive ? 'opacity-20 scale-75 grayscale blur-[2px]' : 'opacity-100 scale-100'
          }`}
        style={{
          background: `radial-gradient(circle at center, ${category.color}60 0%, ${category.color}20 100%)`,
          border: `4px solid ${isActive ? category.color : 'rgba(255,255,255,0.3)'}`,
          boxShadow: isActive
            ? `0 0 140px ${category.color}, inset 0 0 70px ${category.color}`
            : `0 0 50px ${category.color}40`
        }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-6 border-2 border-dashed rounded-full pointer-events-none opacity-40"
          style={{ borderColor: category.color }}
        />

        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <Icon className="w-16 h-16 mb-6" style={{ color: category.color }} />
              <span className="text-base md:text-xl mono font-black tracking-widest uppercase" style={{ color: category.color }}>
                {category.name}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center px-8 text-center"
            >
              <span className="text-sm md:text-lg mono font-black tracking-widest uppercase mb-4 text-white">
                {category.name}
              </span>
              <p className="text-xs md:text-sm text-gray-200 font-bold mono leading-relaxed uppercase max-w-[200px]">
                {category.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rapid Pulse Wave */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: category.color }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.button>



      {/* Expanded Orbiting Skill System */}
      <div className="absolute inset-0 z-10">
        {category.skills.map((skill, i) => {
          const angle = (i * (360 / category.skills.length)) * (Math.PI / 180);
          const radius = isActive ? 300 : 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={skill}
              className="absolute top-1/2 left-1/2"
              animate={{
                x: x,
                y: y
              }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
              style={{ marginLeft: -50, marginTop: -25 }}
            >
              <FloatingSkill
                name={skill}
                color={category.color}
                index={i}
                isActive={isActive}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section id="skills" ref={containerRef} className="min-h-[140vh] relative py-40 px-4 bg-[#010101] overflow-hidden flex items-center">
      {/* Background Starfield Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Massive Nebula Blobs for Deep Intergalactic Feel */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-[0.08] blur-[180px] pointer-events-none"
          style={{
            background: i % 2 === 0 ? '#00f0ff' : '#ff006e',
            left: `${(i * 30) % 100}%`,
            top: `${(i * 45) % 100}%`
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 15 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full relative z-10 font-sans">
        {/* TITAN Background Text */}
        <h2 className="text-[20vw] font-black text-white/[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0">
          SYSTEM_CORE
        </h2>

        <motion.div className="text-center mb-40 md:mb-64 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-white/5 border border-white/30 mb-8 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <Orbit className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            <span className="mono text-sm text-white uppercase tracking-[0.6em] font-black">Neural Galaxy v2.0</span>
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black text-white relative leading-[1.1] tracking-tighter">
            Architecting Your <br />
            <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent italic drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">Digital Verse</span>
          </h2>
        </motion.div>

        {/* The Galaxy - High Performance CSS Grid */}
        <div className="relative h-[1000px] flex items-center justify-center">
          <motion.div
            style={{ rotate, scale }}
            className="w-full h-full max-w-6xl relative grid grid-cols-2 gap-48 md:gap-64"
          >
            {skillCategories.map((category) => (
              <CategoryNode
                key={category.name}
                category={category}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </motion.div>

          {/* Central Pulsing Singularlty */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              className="w-64 h-64 rounded-full border-2 border-white/5 flex items-center justify-center bg-transparent backdrop-blur-[2px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_60px_#fff] scale-150 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-white/10 to-purple-500/20 rounded-full blur-xl" />
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[200%] h-[1px]"
                  style={{ rotate: `${i * 30}deg`, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation Indicator */}
        <motion.div
          animate={{ opacity: activeCategory ? 0.2 : 1 }}
          className="text-center mt-48 flex flex-col items-center gap-6"
        >
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-cyan-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <p className="text-sm md:text-base mono text-white uppercase tracking-[0.5em] font-black drop-shadow-lg scale-110">
            {activeCategory ? 'SYSTEMS_ONLINE' : 'SYNC_WITH_CORE'}
          </p>
        </motion.div>
      </div>

      {/* Global Particle Storm */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-[2px] bg-white/40 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: Math.random()
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 12,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </section>
  );
}
