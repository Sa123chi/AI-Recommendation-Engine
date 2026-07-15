import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Grid, Zap, History, Bookmark, ShieldCheck } from 'lucide-react';

const Features = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const featuresData = [
    {
      title: 'AI-Powered Recommendations',
      icon: Sparkles,
      description: 'Receive personalized recommendations using advanced AI.',
      gradient: 'from-purple-600 to-pink-500',
    },
    {
      title: '10+ Categories',
      icon: Grid,
      description: 'Movies, Books, Travel, Careers, Electronics, Courses, Music, Fashion and more.',
      gradient: 'from-blue-600 to-indigo-500',
    },
    {
      title: 'Lightning Fast',
      icon: Zap,
      description: 'Get recommendations in seconds.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Recommendation History',
      icon: History,
      description: 'View all previous recommendations anytime.',
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      title: 'Bookmarks',
      icon: Bookmark,
      description: 'Save your favorite recommendations.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      title: 'Privacy & Security',
      icon: ShieldCheck,
      description: 'Your personal preferences remain secure.',
      gradient: 'from-sky-500 to-blue-600',
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 bg-slate-950 text-slate-100 bg-mesh overflow-hidden"
    >
      {/* Background radial lights for high-end SaaS feel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/25 px-4 py-2 rounded-full text-xs font-semibold text-purple-300 shadow-md">
              <span>✨ Why Choose Smart Recommend AI</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Everything You Need in One <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Recommendation Platform
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-450 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Our AI understands your preferences and delivers highly personalized recommendations
            instantly.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresData.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  borderColor: 'rgba(168, 85, 247, 0.4)',
                  boxShadow: '0 20px 40px -15px rgba(168, 85, 247, 0.15)',
                }}
                className="glass-panel border border-slate-800/80 bg-slate-900/35 hover:bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl transition-colors duration-300 flex flex-col items-start relative group overflow-hidden cursor-pointer"
              >
                {/* Subtle Hover Border Shine */}
                <div className="absolute -inset-px bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-3xl transition-all duration-300 pointer-events-none" />

                {/* Icon inside Gradient Circle */}
                <div
                  className={`p-3 bg-gradient-to-tr ${feature.gradient} rounded-2xl shadow-lg shadow-purple-500/10 mb-6 text-white`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Card Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
