import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Download, Send, ExternalLink, MapPin, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/UditGupta347', color: '#fff' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/udit-gupta-67520036b/', color: '#0077b5' },

];

function FloatingResumeCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 overflow-hidden"
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0
        }}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? '0 30px 60px rgba(0, 240, 255, 0.15)' : 'none'
        }}
      >
        {/* Resume Preview */}
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-20 bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-purple-100" />
            <FileText className="w-8 h-8 text-gray-700 relative z-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Udit Gupta</h3>
            <p className="text-gray-400 text-sm mb-2">Full-Stack Developer</p>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <MapPin className="w-3 h-3" />
              <span>Solan , Himachal Pradesh</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-gray-800/50">
            <p className="text-2xl font-bold text-cyan-400">3rd </p>
            <p className="text-xs text-gray-500">Year student</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-800/50">
            <p className="text-2xl font-bold text-purple-400">10+</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-800/50">
            <p className="text-2xl font-bold text-pink-400">5</p>
            <p className="text-xs text-gray-500">Certifications</p>
          </div>
        </div>

        {/* Download Button */}
        <motion.a
          href="/Udit_RESUME.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, translateZ: 50 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-50 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold flex items-center justify-center gap-2 group cursor-pointer shadow-2xl mt-4"
          style={{
            transform: 'translateZ(30px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <Download className="w-5 h-5 group-hover:animate-bounce" />
          <span className="relative z-10">Download Resume</span>
        </motion.a>

        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
        />

        {/* Corner Decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent" />
      </motion.div>

      {/* 3D Shadow */}
      <div className="absolute inset-x-4 bottom-0 h-8 bg-gradient-to-t from-cyan-500/10 to-transparent blur-xl -z-10" />
    </motion.div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace with your Web3Forms Access Key
    const ACCESS_KEY = "f3bc2a8a-e451-440c-94ad-a1eae4f7c809";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="bg-gray-900/50 border-gray-800 focus:border-cyan-500/50"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            className="bg-gray-900/50 border-gray-800 focus:border-cyan-500/50"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-2">Message</label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Let's build something amazing together..."
          className="bg-gray-900/50 border-gray-800 focus:border-cyan-500/50 min-h-[120px]"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSending}
        className="w-full py-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold"
      >
        {isSending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </motion.form>
  );
}

export default function ContactSection() {
  return (
    <section className="min-h-screen relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6"
          >
            <Mail className="w-4 h-4 text-green-400" />
            <span className="mono text-sm text-green-400">GET IN TOUCH</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have an opportunity or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Resume & Social */}
          <div className="space-y-8">
            <FloatingResumeCard />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors group"
                >
                  <social.icon
                    className="w-6 h-6 transition-colors"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
            >
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-medium">Available for opportunities</span>
              <Calendar className="w-4 h-4 text-green-400" />
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="p-8 rounded-2xl bg-gray-900/30 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-600 text-sm">
            Designed & Built with{' '}
            <span className="text-pink-400">♥</span>{' '}
            by Udit Gupta © 2025
          </p>
          <p className="text-gray-700 text-xs mt-2 mono">
            Powered by React, Three.js & Framer Motion
          </p>
        </motion.footer>
      </div>
    </section>
  );
}