import React from 'react';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className='bg-gradient-to-r from-slate-800 to-slate-900 text-white w-full py-8 px-4'>
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <motion.div 
            className="flex flex-col items-center md:items-start"
            variants={itemVariants}
          >
            <div className="logo font-bold text-white text-3xl mb-2 hover:text-green-400 transition-colors duration-300">
              <span className='text-green-400'>&lt;</span>
              <span>Secure</span>
              <span className='text-green-400'>Vault/&gt;</span>
            </div>
            <p className="text-slate-300 text-sm">Your password management solution</p>
          </motion.div>

          {/* Links Section */}
          <motion.div 
            className="flex flex-col items-center md:items-start gap-2"
            variants={itemVariants}
          >
            <h3 className="font-semibold text-lg mb-1">Quick Links</h3>
            <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-sm">Home</a>
            <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-sm">Features</a>
            <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-sm">Pricing</a>
            <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-sm">Contact</a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex flex-col items-center md:items-start"
            variants={itemVariants}
          >
            <h3 className="font-semibold text-lg mb-3">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="https://github.com/Puskar10" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-300 text-xl">
                <FaTwitter />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div 
          className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400 text-sm"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-1">
            <span>© {currentYear} SecureVault. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center">
              Made with <FaHeart className="text-red-500 mx-1" /> by Puskar
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;