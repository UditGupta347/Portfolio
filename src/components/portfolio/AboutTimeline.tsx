import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, GraduationCap, Briefcase, Award, Code, Coffee, Heart, Gamepad2 } from 'lucide-react';

const timelineEvents = [
  {
    year: '2023',
    title: 'Started CS Journey',
    description: 'Began my B.Tech in Computer Science at Chitkara University , Baddi. Learned programming fundamentals and wrote my first programs in C/C++. Developed a strong interest in problem-solving and core computer science concepts.',
    icon: GraduationCap,
    color: '#00f0ff',
    achievements: ['DSA Foundations', 'University Learning']
  },
  {
    year: '2024',
    title: 'Exploring Development',
    description: 'Started exploring web development and DSA more seriously. Built small projects, practiced coding platforms, and learned how real-world applications are structured. Gained hands-on experience with frontend and backend basics.',
    icon: Briefcase,
    color: '#8b5cf6',
    achievements: ['DSA Practice', 'Mini Projects']
  },
  {
    year: '2025',
    title: 'Projects & AI Focus',
    description: 'Shifted focus toward AI and full-stack projects. Built portfolio-worthy applications using modern tools, explored Generative AI, APIs, and worked on practical problem-based projects. Became more confident in building end-to-end solutions.',
    icon: Award,
    color: '#ff006e',
    achievements: ['GenAI', 'Full Stack Projects', 'APIs']
  },
  {
    year: '2026',
    title: 'Building for the Future',
    description: 'Currently in my third year of B.Tech CSE at Chitkara University. Actively building AI-powered tools, strengthening system design and backend skills, and preparing for internships and software engineering roles.',
    icon: Rocket,
    color: '#00ff88',
    achievements: ['Skill Building', 'Career Preparation']
  }
];

const personalFacts = [
  { icon: Coffee, text: 'Coffee consumed: 1,247 cups', color: '#00f0ff' },
  { icon: Code, text: 'Lines of code: 500K+', color: '#8b5cf6' },
  { icon: Gamepad2, text: 'Favorite game: Dark Souls', color: '#ff006e' },
  { icon: Heart, text: 'Passion: Building cool things', color: '#00ff88' }
];

function TimelineItem({ event, index, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Content Card */}
      <motion.div
        className={`flex-1 cursor-pointer ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className={`p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border transition-all ${
            isActive ? 'border-cyan-500/50' : 'border-gray-800'
          }`}
          style={{
            boxShadow: isActive ? `0 0 30px ${event.color}30` : 'none'
          }}
        >
          <span
            className="mono text-sm font-bold"
            style={{ color: event.color }}
          >
            {event.year}
          </span>
          <h3 className="text-xl font-bold mt-2 mb-3">{event.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{event.description}</p>
          
          {/* Achievements */}
          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            {event.achievements.map((achievement) => (
              <span
                key={achievement}
                className="px-2 py-1 rounded-full bg-gray-800 text-xs text-gray-400"
              >
                {achievement}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline Node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{
            background: isActive ? event.color : '#1a1a1f',
            border: `2px solid ${event.color}`
          }}
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        >
          <event.icon className={`w-5 h-5 ${isActive ? 'text-black' : ''}`} style={{ color: isActive ? '#000' : event.color }} />
        </motion.div>
        
        {/* Connection Line */}
        {index < timelineEvents.length - 1 && (
          <div className="w-0.5 h-24 bg-gradient-to-b from-gray-700 to-gray-800" />
        )}
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1" />
    </motion.div>
  );
}

export default function AboutTimeline() {
  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <section className="min-h-screen relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6"
          >
            <Rocket className="w-4 h-4 text-pink-400" />
            <span className="mono text-sm text-pink-400">MY JOURNEY</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Story So Far
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From curious beginner to aspiring software engineer
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.year}
              event={event}
              index={index}
              isActive={activeEvent === index}
              onClick={() => setActiveEvent(index)}
            />
          ))}
        </div>

        {/* Personal Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {personalFacts.map((fact, i) => (
            <motion.div
              key={fact.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center group hover:border-gray-700 transition-all"
            >
              <fact.icon
                className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform"
                style={{ color: fact.color }}
              />
              <p className="text-sm text-gray-400">{fact.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-light text-gray-400 italic">
            "Code is poetry written for machines to execute
            <br />
            <span className="text-cyan-400">and humans to understand."</span>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}