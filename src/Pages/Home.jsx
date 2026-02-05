import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsGalaxy from '@/components/portfolio/SkillsGalaxy';
import AboutTimeline from '@/components/portfolio/AboutTimeline';
import ContactSection from '@/components/portfolio/ContactSection';
import Navigation from '@/components/portfolio/Navigation';
import LoadingScreen from '@/components/portfolio/LoadingScreen';
import EasterEggs from '@/components/portfolio/EasterEggs';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [hackerMode, setHackerMode] = useState(false);
  const containerRef = useRef(null);

  const sections = ['hero', 'projects', 'skills', 'about', 'contact'];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const navigateToSection = (index) => {
    setCurrentSection(index);
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-[#0a0a0f] text-white overflow-hidden transition-all duration-500 ${
        hackerMode ? 'hacker-mode' : ''
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .glow-cyan {
          text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff;
        }
        
        .glow-purple {
          text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 40px #8b5cf6;
        }
        
        .glow-pink {
          text-shadow: 0 0 10px #ff006e, 0 0 20px #ff006e;
        }
        
        .box-glow-cyan {
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1), inset 0 0 20px rgba(0, 240, 255, 0.05);
        }
        
        .box-glow-purple {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);
        }
        
        .gradient-border {
          background: linear-gradient(135deg, #00f0ff, #8b5cf6, #ff006e);
          padding: 1px;
        }
        
        .hacker-mode {
          filter: hue-rotate(120deg) saturate(1.5);
        }
        
        .hacker-mode * {
          color: #00ff00 !important;
        }
        
        .scanline {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
        }
        
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes data-stream {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-animation {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0a0f;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00f0ff, #8b5cf6);
          border-radius: 3px;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 noise" />
            <div className="absolute inset-0 scanline opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
          </div>

          <Navigation 
            sections={sections} 
            currentSection={currentSection} 
            onNavigate={navigateToSection}
            hackerMode={hackerMode}
            setHackerMode={setHackerMode}
          />

          <EasterEggs />

          <main className="relative z-10">
            <AnimatePresence mode="wait">
              {currentSection === 0 && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <HeroSection onEnter={() => navigateToSection(1)} />
                </motion.div>
              )}
              
              {currentSection === 1 && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <ProjectsSection />
                </motion.div>
              )}
              
              {currentSection === 2 && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.8 }}
                >
                  <SkillsGalaxy />
                </motion.div>
              )}
              
              {currentSection === 3 && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.8 }}
                >
                  <AboutTimeline />
                </motion.div>
              )}
              
              {currentSection === 4 && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.8 }}
                >
                  <ContactSection />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}