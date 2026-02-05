import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, Code2, Cpu } from 'lucide-react';
import ParticleField from './ParticleField';
import TerminalText from './TerminalText';

export default function HeroSection({ onEnter }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nameRevealed, setNameRevealed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setNameRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const name = "Udit Gupta";
  const letters = name.split('');

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* 3D Particle Background */}
      <ParticleField mousePosition={mousePosition} />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-cyan-500/20 rounded-lg"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              rotateX: mousePosition.y * 30,
              rotateY: mousePosition.x * 30,
              translateZ: [0, 50, 0],
            }}
            transition={{
              translateZ: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              transformStyle: 'preserve-3d',
              transform: `
                perspective(1000px) 
                rotateX(${mousePosition.y * 20}deg) 
                rotateY(${mousePosition.x * 20}deg)
                translateZ(${i * 10}px)
              `
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="mono text-xs text-cyan-400">SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span className="mono text-xs text-purple-400">v3.0.24</span>
          </div>
        </motion.div>

        {/* Name Animation */}
        <div className="relative mb-6">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
            style={{
              transform: `
                perspective(1000px) 
                rotateX(${mousePosition.y * 5}deg) 
                rotateY(${mousePosition.x * 5}deg)
              `
            }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className={`inline-block ${letter === ' ' ? 'w-4 md:w-8' : ''}`}
                initial={{
                  opacity: 0,
                  y: 100,
                  rotateX: 90,
                  filter: 'blur(10px)'
                }}
                animate={nameRevealed ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)'
                } : {}}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100
                }}
                style={{
                  background: 'linear-gradient(135deg, #00f0ff, #8b5cf6, #ff006e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 60px rgba(0, 240, 255, 0.5)'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Glitch Effect Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: [0, -2, 2, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-red-500/30"
              style={{ transform: 'translateX(3px)' }}
            >
              {name}
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xl md:text-2xl text-gray-400 mb-8 flex items-center justify-center gap-3"
        >
          <Code2 className="w-5 h-5 text-cyan-400" />
          <span>Full-Stack Developer</span>
          <span className="text-cyan-400">×</span>
          <span>3rd Year CS Student</span>
          <Zap className="w-5 h-5 text-purple-400" />
        </motion.p>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="max-w-lg mx-auto"
        >
          <TerminalText />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          onClick={onEnter}
          className="group relative mt-12 px-8 py-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg" />
          <div className="absolute inset-[1px] bg-[#0a0a0f] rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 mono font-semibold text-white flex items-center gap-2">
            ENTER THE VOID
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="mono text-xs">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-purple-500/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-purple-500/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30" />
    </section>
  );
}