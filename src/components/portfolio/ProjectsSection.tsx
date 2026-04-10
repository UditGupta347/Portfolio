import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Layers, Zap, Star } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'CareerPath AI',
    description: 'AI-powered platform that helps engineering students identify trending industry projects and required technologies. Provides end-to-end project roadmaps (tasks, resources, and file structure), AI-based custom project generation, resume skill-gap analysis for target roles, and an integrated resume builder with AI assistant.',
    image: '/projects/careerpath-ai.png',
    tags: ['AI/ML', 'React', 'Tailwind CSS', 'Gemini AI', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    color: '#00f0ff',
    stats: { stars: 234, forks: 45 },
    link: 'https://career-path-ai-iota.vercel.app',
    github: 'https://github.com/UditGupta347/CareerPath-AI'
  },
  {
    id: 2,
    title: 'Interview Simulation',
    description: 'Interview Simulation is an AI-powered platform that conducts real-time mock interviews based on the selected role and interview round, available in both chat and voice modes, helping candidates practice and prepare with a realistic interview experience.',
    image: '/projects/interview-simulation.jpg',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'TanStack Query', ' Vercel', 'Vite'],
    color: '#8b5cf6',
    stats: { stars: 189, forks: 32 },
    link: 'https://interview-simulation-liart.vercel.app/',
    github: 'https://github.com/UditGupta347/Interview-Simulation'
  },
  {
    id: 3,
    title: 'Leetcode - Github pusher extension  ',
    description: 'An automated Chrome extension that transforms LeetCode practice into a GitHub-ready portfolio by pushing solutions with embedded logic explanations in real time.',
    image: '/projects/leetcode-github-pusher.jpg',
    tags: ['JavaScript', 'HTML', 'Canvas', 'CSS', 'OpenRouter API', 'API Integration'],
    color: '#ff006e',
    stats: { stars: 156, forks: 28 },
    link: 'https://gitcode-phi.vercel.app/',
    github: 'https://github.com/UditGupta347/leetcode-github-pusher-extension'
  },
  {
    id: 4,
    title: 'DoCraft',
    description: 'DocCraft is an AI-powered documentation engine designed to transform complex codebases into human-readable, professional technical documentation. It bridges the gap between rapid development and high-quality project onboarding by automating the creation of system audits, architecture diagrams, and technical walkthroughs.',
    image: '/projects/doccraft.jpg',
    tags: ['Vite', 'Tailwind CSS', 'Framer Motion', 'Groq (Llama 3.3)', 'GitHub API', 'Recharts'],
    color: '#00ff88',
    stats: { stars: 98, forks: 15 },
    link: 'https://do-craft.vercel.app/',
    github: 'https://github.com/UditGupta347/DoCraft'
  }
];

function ProjectCard({ project, index, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative cursor-pointer ${isSelected ? 'z-50' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 group"
        whileHover={{ scale: 1.02, y: -5 }}
        style={{
          boxShadow: isHovered ? `0 20px 60px ${project.color}20, 0 0 30px ${project.color}10` : 'none'
        }}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Holographic Overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `linear-gradient(135deg, ${project.color}10, transparent 50%, ${project.color}10)`
            }}
          />

          {/* Scan Line Effect */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
            animate={isHovered ? { top: ['0%', '100%'] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold" style={{ color: project.color }}>
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500">
              <Star className="w-4 h-4" />
              <span className="mono text-xs">{project.stats.stars}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full mono text-xs bg-gray-800 text-gray-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 rounded-full mono text-xs bg-gray-800 text-gray-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${isHovered ? project.color : 'transparent'}`,
            opacity: isHovered ? 0.5 : 0
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.8, rotateY: -30 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.8, rotateY: 30 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="relative max-w-4xl w-full bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 100px ${project.color}30, inset 0 0 50px ${project.color}05`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="relative h-64 md:h-80">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Floating Tech Icons */}
          <div className="absolute bottom-4 left-4 flex gap-3">
            {project.tags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 mono text-xs"
                style={{ borderColor: `${project.color}50` }}
              >
                {tag}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-4"
            style={{ color: project.color }}
          >
            {project.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg mb-6 leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="mono">{project.stats.stars} stars</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <span className="mono">{project.stats.forks} forks</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <a
              href={project.link}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-black font-semibold transition-transform hover:scale-105"
              style={{ background: project.color }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
            <a
              href={project.github}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

const INITIAL_COUNT = 4;

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <section className="min-h-screen relative py-24 px-4 md:px-8">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="mono text-sm text-cyan-400">FEATURED PROJECTS</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Things I've Built
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my passion for creating innovative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isSelected={selectedProject?.id === project.id}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button — only shown when there are more than INITIAL_COUNT projects */}
        {hasMore && !showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative px-8 py-4 overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all" />
              <div className="absolute inset-[1px] bg-gray-900 rounded-xl" />
              <span className="relative z-10 mono text-gray-300 flex items-center gap-2">
                View All Projects ({projects.length - INITIAL_COUNT} more)
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}