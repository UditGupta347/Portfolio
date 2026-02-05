import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  
  const loadingMessages = [
    'Initializing quantum processors...',
    'Loading neural networks...',
    'Compiling experience modules...',
    'Rendering digital universe...',
    'Calibrating holographic displays...',
    'System ready.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messageIndex = Math.min(
      Math.floor(progress / 20),
      loadingMessages.length - 1
    );
    setLoadingText(loadingMessages[messageIndex]);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Animated Circles */}
      <div className="relative w-48 h-48 mb-12">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-cyan-500/30 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.5, 0.5],
              opacity: [0, 0.5, 0],
              rotate: 360
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        {/* Center Logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg transform rotate-45" />
            <div className="absolute inset-2 bg-[#0a0a0f] rounded-lg transform rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-black text-cyan-400 glow-cyan">{'<>'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="w-80 mb-6">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs mono text-gray-500">
          <span>LOADING</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Loading Text */}
      <motion.p
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mono text-sm text-cyan-400/70"
      >
        {loadingText}
      </motion.p>

      {/* Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: '200px'
            }}
            initial={{ y: -200 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}