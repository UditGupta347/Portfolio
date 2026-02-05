import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TerminalText() {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines = [
    { text: '> Initializing Developer...', color: 'text-cyan-400' },
    { text: '> Loading Projects...', color: 'text-purple-400' },
    { text: '> Skills: ONLINE', color: 'text-green-400' },
    { text: '> Coffee Level: CRITICAL', color: 'text-yellow-400' },
    { text: '> Ready to build amazing things.', color: 'text-pink-400' },
  ];

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    
    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 30 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 mono text-xs text-gray-500">developer@portfolio ~ </span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 mono text-sm space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={line.color}
          >
            {line.text}
          </motion.div>
        ))}
        
        {/* Current typing line */}
        {currentLineIndex < terminalLines.length && (
          <div className={terminalLines[currentLineIndex].color}>
            {terminalLines[currentLineIndex].text.slice(0, currentCharIndex)}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-current ml-1"
            />
          </div>
        )}

        {/* Blinking cursor after complete */}
        {isComplete && (
          <div className="text-gray-500 flex items-center">
            <span>{'>'}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan-400 ml-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}