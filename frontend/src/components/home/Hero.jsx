import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ChevronRight } from 'lucide-react';

const Hero = () => {
  // Animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatTransition = (delay = 0) => ({
    y: {
      duration: 3.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay: delay,
    },
    rotate: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay: delay * 0.5,
    },
  });

  const floatCards = [
    {
      emoji: '🎬',
      title: 'Movies',
      sub: 'Sci-Fi • 9.8 match',
      class: 'top-[12%] left-[4%]',
      delay: 0,
      yVal: [-6, 6],
      rotVal: [-2, 2],
    },
    {
      emoji: '📚',
      title: 'Books',
      sub: 'Self-Help • 9.6 match',
      class: 'top-[22%] right-[6%]',
      delay: 0.7,
      yVal: [-8, 8],
      rotVal: [1, -3],
    },
    {
      emoji: '✈️',
      title: 'Travel',
      sub: 'Kyoto • 9.9 match',
      class: 'bottom-[36%] left-[6%]',
      delay: 1.4,
      yVal: [-7, 7],
      rotVal: [-3, 1],
    },
    {
      emoji: '💻',
      title: 'Electronics',
      sub: 'M3 Laptop • 9.5 match',
      class: 'bottom-[24%] right-[10%]',
      delay: 2.1,
      yVal: [-9, 9],
      rotVal: [2, -2],
    },
    {
      emoji: '🎓',
      title: 'Courses',
      sub: 'AI & ML • 9.7 match',
      class: 'bottom-[6%] left-[32%]',
      delay: 2.8,
      yVal: [-5, 5],
      rotVal: [-1, 2],
    },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-slate-950 text-slate-100 bg-mesh">
      {/* Dynamic Animated Gradient Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Side: Content & Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8 text-center lg:text-left"
        >
          {/* Glowing Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/25 px-4 py-2 rounded-full text-xs font-semibold text-purple-300 shadow-lg shadow-purple-500/5">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                ✨ AI Powered Recommendation Engine
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Discover Perfect Recommendations <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Find books, movies, careers, gadgets, travel destinations, restaurants and more based on
            your preferences using advanced AI.
          </motion.p>

          {/* Call-to-action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-purple-500/20 text-center flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <span>Start Exploring</span>
              <ChevronRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#learn-more"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-200 font-semibold text-center backdrop-blur-md transition-all duration-300"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0"
          >
            <div>
              <h4 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                50K+
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug">
                Recommendations Generated
              </p>
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                10+
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug">Categories</p>
            </div>
            <div>
              <h4 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                98%
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug">Accuracy</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: AI Illustration and Floating Cards */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] lg:min-h-[550px] w-full">
          {/* Orbital and Glow System */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-purple-500/10 flex items-center justify-center pointer-events-none">
            <div className="w-60 h-60 rounded-full border border-blue-500/10 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-pink-500/5 flex items-center justify-center">
                {/* Central brain core */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-blue-500/20 backdrop-blur-xl flex items-center justify-center relative group"
                >
                  <Brain className="w-10 h-10 text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Orbital dashed trails */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-[85%] h-[85%] opacity-15" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="url(#gradient-blue)"
                strokeWidth="0.5"
                strokeDasharray="4 8"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#gradient-purple)"
                strokeWidth="0.5"
                strokeDasharray="6 12"
              />
              <defs>
                <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Recommendation Cards */}
          {floatCards.map((card) => (
            <motion.div
              key={card.title}
              animate={{
                y: card.yVal,
                rotate: card.rotVal,
              }}
              transition={floatTransition(card.delay)}
              whileHover={{ scale: 1.05, y: -15 }}
              className={`absolute ${card.class} glass-panel flex items-center space-x-3.5 px-4.5 py-3 rounded-2xl shadow-xl shadow-slate-950/20 border border-white/5 backdrop-blur-md bg-slate-900/40 z-20 cursor-pointer`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950/60 flex items-center justify-center text-xl shadow-inner">
                {card.emoji}
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-100">{card.title}</h5>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
