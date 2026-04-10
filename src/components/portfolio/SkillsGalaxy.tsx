import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Globe, Terminal, Sparkles, Zap } from 'lucide-react';

const skillCategories = [
  {
    name: 'Frontend',
    icon: Globe,
    color: '#00f0ff',
    shadowColor: 'rgba(0, 240, 255, 0.4)',
    description: 'Immersive UI/UX Engineering with high-performance frameworks.',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'FramerMotion', level: 85 },
    ]
  },
  {
    name: 'Backend',
    icon: Database,
    color: '#8b5cf6',
    shadowColor: 'rgba(139, 92, 246, 0.4)',
    description: 'Scalable server-side architectures and real-time data pipelines.',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Socket.io', level: 78 },
    ]
  },
  {
    name: 'Intelligence',
    icon: Cpu,
    color: '#ff006e',
    shadowColor: 'rgba(255, 0, 110, 0.4)',
    description: 'Integrating LLMs, Neural Networks, and AI-driven automation.',
    skills: [
      { name: 'GenAI', level: 82 },
      { name: 'OpenAI', level: 90 },
      { name: 'Gemini', level: 86 },
      { name: 'OpenAI API', level: 92 },
      { name: 'Groq', level: 80 },
    ]
  },
  {
    name: 'Ecosystem',
    icon: Terminal,
    color: '#00ff88',
    shadowColor: 'rgba(0, 255, 136, 0.4)',
    description: 'Modern DevOps workflows and cloud infrastructure mastery.',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 82 },
      { name: 'AWS', level: 78 },
      { name: 'Vercel', level: 90 },
      { name: 'Linux', level: 85 },
      { name: 'Github Actions', level: 80 },
      { name: 'NPM', level: 92 },
      { name: 'Vite', level: 88 },
    ]
  }
];

/*
 * PERFORMANCE STRATEGY:
 * - CSS @keyframes → all CONTINUOUS/INFINITE animations (scan, rotate, pulse, float, stream)
 *   These run on the GPU compositor thread, zero JS overhead.
 * - Framer Motion → all ONE-SHOT interactions (entrance, expand, dim, hover, progress bar fill)
 *   These fire once per interaction and stop — they give springy/organic feel with no perf cost.
 */
const cssAnimations = `
  @keyframes sg-scan {
    0% { transform: translateY(-100%) translateZ(0); }
    100% { transform: translateY(100%) translateZ(0); }
  }
  @keyframes sg-rotate {
    from { transform: rotate(0deg) translateZ(0); }
    to { transform: rotate(360deg) translateZ(0); }
  }
  @keyframes sg-pulse-dot {
    0%, 100% { transform: scale(1) translateZ(0); opacity: 0.7; }
    50% { transform: scale(1.3) translateZ(0); opacity: 1; }
  }
  @keyframes sg-pulse-opacity {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  @keyframes sg-border-pulse {
    0%, 100% { opacity: 0.3; transform: scaleX(0.5) translateZ(0); }
    50% { opacity: 1; transform: scaleX(1) translateZ(0); }
  }
  @keyframes sg-bg-pulse {
    0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; }
    50% { transform: scale(1.2) translateZ(0); opacity: 0.6; }
  }
  @keyframes sg-shine-bar {
    0% { transform: translateX(-100%) translateZ(0); }
    100% { transform: translateX(200%) translateZ(0); }
  }
  @keyframes sg-glow-soft {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  @keyframes sg-float-particle {
    0% { transform: translateY(0) translateZ(0); opacity: 0; }
    20% { opacity: 0.5; }
    100% { transform: translateY(-120px) translateZ(0); opacity: 0; }
  }
  @keyframes sg-stream {
    0% { transform: scaleX(0) translateZ(0); opacity: 0; }
    50% { transform: scaleX(1) translateZ(0); opacity: 0.4; }
    100% { transform: scaleX(0) translateZ(0); opacity: 0; }
  }
  @keyframes sg-orb {
    0%, 100% { transform: scale(1) translateZ(0); opacity: 0.4; }
    50% { transform: scale(1.2) translateZ(0); opacity: 0.7; }
  }
  .sg-gpu { will-change: transform, opacity; transform: translateZ(0); }
`;

/* ─── Pre-computed background data (no random calls during render) ─── */
const dataStreams = Array.from({ length: 8 }, (_, i) => ({
  width: 80 + (i * 17) % 120,
  left: 10 + (i * 11) % 70,
  top: 10 + (i * 13) % 75,
  duration: 3 + (i % 4),
  delay: i * 0.7,
  colorIdx: i % 4,
}));

const particlePool = Array.from({ length: 8 }, (_, i) => ({
  char: ['0', '1', '<', '>', '/', '{', '}', ';'][i % 8],
  left: 5 + (i * 12) % 85,
  top: 20 + (i * 11) % 60,
  duration: 5 + (i % 4) * 2,
  delay: i * 0.6,
}));

/* ─── Skill Pill — FM for entrance spring, CSS for continuous scan ─── */
const SkillPill = memo(function SkillPill({
  name, color, index, categoryIndex
}: {
  name: string; color: string; index: number; categoryIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80, rotateY: -90, filter: 'blur(12px)' }}
      animate={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
      transition={{
        delay: 0.08 * index + 0.15 * categoryIndex,
        duration: 0.7,
        type: 'spring',
        stiffness: 120,
        damping: 14
      }}
      whileHover={{ scale: 1.15, y: -8, zIndex: 50 }}
      className="relative group cursor-pointer"
      style={{ perspective: '800px' }}
    >
      {/* Hover glow — pure CSS */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent, ${color})`,
          filter: 'blur(8px)',
        }}
      />

      <div
        className="relative px-5 py-3 rounded-xl overflow-hidden transition-all duration-400"
        style={{
          background: `linear-gradient(135deg, rgba(15,15,25,0.95), rgba(15,15,25,0.8))`,
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Holographic scan line — CSS animation (was FM infinite loop = lag source) */}
        <div
          className="absolute inset-0 pointer-events-none sg-gpu"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${color}15 50%, transparent 100%)`,
            height: '200%',
            animation: `sg-scan 2.5s linear infinite`,
            animationDelay: `${index * 0.3}s`,
          }}
        />

        <span
          className="relative z-10 mono text-sm font-bold tracking-wider transition-all duration-300 group-hover:text-white"
          style={{ color }}
        >
          {name}
        </span>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: color }} />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: color }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: color }} />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: color }} />
      </div>
    </motion.div>
  );
});

/* ─── Category Card — FM for springs/interactions, CSS for loops ─── */
const CategoryCard = memo(function CategoryCard({
  category, index, expandedIndex, setExpandedIndex
}: {
  category: typeof skillCategories[0];
  index: number;
  expandedIndex: number | null;
  setExpandedIndex: (i: number | null) => void;
}) {
  const isExpanded = expandedIndex === index;
  const isAnyExpanded = expandedIndex !== null;
  const Icon = category.icon;
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    /*
     * Outer wrapper: FM handles entrance animation (slide up), dim/focus (opacity+scale),
     * and col-span change. These are ONE-SHOT spring transitions, not infinite loops.
     */
    <motion.div
      ref={cardRef}
      className={`relative ${isExpanded ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
      initial={{ opacity: 0, y: 100, rotateX: 25 }}
      animate={isInView ? {
        opacity: isAnyExpanded && !isExpanded ? 0.3 : 1,
        y: 0,
        rotateX: 0,
        scale: isAnyExpanded && !isExpanded ? 0.92 : 1,
        filter: isAnyExpanded && !isExpanded ? 'blur(3px) grayscale(0.5)' : 'blur(0px) grayscale(0)',
      } : {}}
      transition={{
        delay: isInView && !isAnyExpanded ? index * 0.15 : 0,
        duration: 0.6,
        type: 'spring',
        stiffness: 80,
        damping: 16,
      }}
      style={{ perspective: '1200px' }}
    >
      {/* Inner card: FM handles hover lift */}
      <motion.div
        onClick={() => setExpandedIndex(isExpanded ? null : index)}
        className="relative rounded-2xl cursor-pointer overflow-hidden group"
        whileHover={!isExpanded ? { y: -6, scale: 1.02 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          background: 'rgba(8, 8, 20, 0.85)',
          border: `1px solid ${isExpanded ? category.color : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isExpanded
            ? `0 0 80px ${category.shadowColor}, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'box-shadow 0.6s ease, border-color 0.6s ease',
        }}
      >
        {/* Animated top border gradient — CSS infinite loop */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] sg-gpu"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
            animation: isExpanded ? 'sg-border-pulse 2s ease-in-out infinite' : 'none',
            opacity: isExpanded ? undefined : 0.3,
          }}
        />

        {/* Background pulse when expanded — CSS infinite loop */}
        {isExpanded && (
          <div
            className="absolute inset-0 pointer-events-none sg-gpu"
            style={{
              background: `radial-gradient(ellipse at center, ${category.color}08, transparent 70%)`,
              animation: 'sg-bg-pulse 3s ease-in-out infinite',
            }}
          />
        )}

        {/* Floating code particles — CSS infinite loop */}
        {isExpanded && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePool.map((p, i) => (
              <span
                key={i}
                className="absolute mono text-[10px] select-none sg-gpu"
                style={{
                  color: `${category.color}35`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  animation: `sg-float-particle ${p.duration}s ease-out infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              >
                {p.char}
              </span>
            ))}
          </div>
        )}

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center gap-5 mb-6">
            {/* Icon container with CSS rotating border */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${category.color}20, ${category.color}05)`,
                  border: `1px solid ${category.color}40`,
                  boxShadow: isExpanded ? `0 0 30px ${category.color}40` : 'none',
                  transition: 'box-shadow 0.6s ease',
                }}
              >
                {/* Rotating border — CSS infinite loop */}
                <div
                  className="absolute inset-0 rounded-xl sg-gpu"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${category.color}40, transparent, ${category.color}40, transparent)`,
                    animation: 'sg-rotate 4s linear infinite',
                  }}
                />
                <div className="absolute inset-[1px] rounded-xl" style={{ background: `linear-gradient(135deg, rgba(8,8,20,0.95), rgba(8,8,20,0.8))` }} />
                <Icon className="w-7 h-7 relative z-10" style={{ color: category.color }} />
              </div>

              {/* Status dot — CSS infinite loop */}
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full sg-gpu"
                style={{
                  background: category.color,
                  boxShadow: `0 0 10px ${category.color}`,
                  animation: 'sg-pulse-dot 1.5s ease-in-out infinite',
                }}
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                {category.name}
                <span
                  className="inline-block ml-3 mono text-xs font-normal tracking-widest uppercase"
                  style={{ color: `${category.color}90` }}
                >
                  [{String(index + 1).padStart(2, '0')}]
                </span>
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full" style={{ background: category.color }} />
                <span className="mono text-xs uppercase tracking-widest" style={{ color: `${category.color}80` }}>
                  {category.skills.length} modules loaded
                </span>
              </div>
            </div>

            {/* Expand indicator — FM spring rotation */}
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                border: `1px solid ${category.color}40`,
                background: `${category.color}10`,
              }}
            >
              <span className="text-lg" style={{ color: category.color }}>+</span>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 mono leading-relaxed mb-6 max-w-xl">
            {category.description}
          </p>

          {/* Skills Pills */}
          <div className={`flex flex-wrap gap-3 ${isExpanded ? 'mt-4' : ''}`}>
            {category.skills.map((skill, i) => (
              <SkillPill
                key={skill.name}
                name={skill.name}
                color={category.color}
                index={i}
                categoryIndex={index}
              />
            ))}
          </div>

          {/* Expanded: Skill level bars with FM spring entrance */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 18 }}
                className="mt-8 space-y-4 overflow-hidden"
              >
                {/* Divider — FM one-shot scale + CSS infinite pulse */}
                <motion.div
                  className="h-px w-full sg-gpu"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i + 0.3, type: 'spring', stiffness: 120, damping: 16 }}
                      className="relative"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="mono text-xs font-bold tracking-wider" style={{ color: category.color }}>
                          {skill.name}
                        </span>
                        <motion.span
                          className="mono text-xs"
                          style={{ color: `${category.color}90` }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${category.color}15` }}>
                        <motion.div
                          className="h-full rounded-full relative sg-gpu"
                          style={{
                            background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                            boxShadow: `0 0 15px ${category.color}60`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {/* Shine — CSS infinite loop */}
                          <div
                            className="absolute inset-0 sg-gpu"
                            style={{
                              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                              animation: 'sg-shine-bar 2s ease-in-out infinite',
                              animationDelay: `${1.5 + i * 0.15}s`,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats row */}
                <motion.div
                  className="flex items-center gap-6 mt-6 pt-4"
                  style={{ borderTop: `1px solid ${category.color}15` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3" style={{ color: category.color }} />
                    <span className="mono text-[10px] uppercase tracking-widest text-gray-500">
                      Active modules: {category.skills.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full sg-gpu"
                      style={{ background: '#00ff88', animation: 'sg-pulse-opacity 1.5s ease-in-out infinite' }}
                    />
                    <span className="mono text-[10px] uppercase tracking-widest text-gray-500">
                      Status: Operational
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom gradient line */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}30, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
});

/* ─── Main Component ─── */
export default function SkillsGalaxy() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef(null);

  return (
    <section id="skills" ref={containerRef} className="min-h-screen relative py-32 md:py-40 px-4 md:px-8 bg-[#010101] overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: cssAnimations }} />

      {/* ─── Background Layers ─── */}

      {/* Grid pattern — static */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Gradient orbs — CSS infinite loop */}
      {skillCategories.map((cat, i) => (
        <div
          key={cat.name}
          className="absolute rounded-full pointer-events-none mix-blend-screen sg-gpu"
          style={{
            width: '35vw',
            height: '35vw',
            background: `radial-gradient(circle, ${cat.color}06, transparent 70%)`,
            left: `${[5, 55, 10, 60][i]}%`,
            top: `${[10, 30, 60, 75][i]}%`,
            animation: `sg-orb ${10 + i * 3}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Data stream lines — CSS infinite loop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dataStreams.map((s, i) => (
          <div
            key={i}
            className="absolute h-px sg-gpu"
            style={{
              width: `${s.width}px`,
              background: `linear-gradient(90deg, transparent, ${skillCategories[s.colorIdx].color}60, transparent)`,
              left: `${s.left}%`,
              top: `${s.top}%`,
              animation: `sg-stream ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 md:mb-28 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Giant background text */}
          <h2 className="text-[15vw] md:text-[12vw] font-black text-white/[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0 pointer-events-none">
            SKILLS
          </h2>

          {/* Badge — FM entrance spring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/[0.03] border border-white/10 mb-8"
          >
            <div className="sg-gpu" style={{ animation: 'sg-rotate 8s linear infinite' }}>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="mono text-xs text-white/80 uppercase tracking-[0.5em] font-bold">Core Systems</span>
            <div
              className="w-1.5 h-1.5 rounded-full bg-green-400 sg-gpu"
              style={{ animation: 'sg-pulse-opacity 1.5s ease-in-out infinite' }}
            />
          </motion.div>

          {/* Main title — FM entrance spring */}
          <motion.h2
            className="text-5xl md:text-8xl lg:text-9xl font-black text-white relative leading-[1] tracking-tighter"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring' }}
          >
            <span className="relative">
              Tech
              <span
                className="absolute -inset-2 pointer-events-none sg-gpu"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.1), transparent)',
                  filter: 'blur(20px)',
                  animation: 'sg-glow-soft 3s ease-in-out infinite',
                }}
              />
            </span>
            {' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>

          <motion.p
            className="mono text-sm text-gray-500 mt-6 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Tap a category to deploy its modules
          </motion.p>
        </motion.div>

        {/* ─── Skills Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          ))}
        </div>

        {/* Bottom status bar */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-1 rounded-full"
                animate={{
                  background: expandedIndex === i ? skillCategories[i].color : 'rgba(255,255,255,0.1)',
                  boxShadow: expandedIndex === i ? `0 0 15px ${skillCategories[i].color}` : '0 0 0px transparent',
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
          <p className="mono text-[10px] text-gray-600 uppercase tracking-[0.4em]">
            {expandedIndex !== null
              ? `// ${skillCategories[expandedIndex].name.toUpperCase()}_SYSTEMS → DEPLOYED`
              : '// ALL_SYSTEMS → STANDBY'}
          </p>
        </motion.div>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
      }} />
    </section>
  );
}
