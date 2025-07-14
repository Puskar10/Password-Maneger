import React, { useState, useEffect, useRef } from 'react';
import { FiGithub } from 'react-icons/fi';
import { FiChevronUp } from 'react-icons/fi';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(64);

  // Get navbar height and set up listeners
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll handlers
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollPos / docHeight) * 100;

      // Scroll progress
      setScrollProgress(progress);
      
      // Show/hide scroll-to-top button
      setShowScrollTop(currentScrollPos > window.innerHeight / 2);

      // Navbar visibility
      if (currentScrollPos < 10) {
        setVisible(true);
      } else {
        setVisible(isScrollingUp || currentScrollPos < 10);
      }

      setPrevScrollPos(currentScrollPos);
    };

    const throttledHandleScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    window.addEventListener('scroll', throttledHandleScroll());
    return () => window.removeEventListener('scroll', throttledHandleScroll());
  }, [prevScrollPos]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Fixed Navbar with scroll indicator */}
      <nav 
        ref={navRef}
        className={`fixed w-full z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } bg-slate-900/95 backdrop-blur-sm py-3 shadow-lg`}
      >
        {/* Scroll progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500" 
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <span className="text-green-400 text-2xl font-bold">&lt;</span>
              <span className="text-white text-2xl font-bold">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  VaultGuard
                </span>
              </span>
              <span className="text-green-400 text-2xl font-bold">/&gt;</span>
            </div>

            {/* GitHub Button */}
            <a
              href="https://github.com/Puskar10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-400/40"
            >
              <FiGithub className="w-5 h-5" />
              <span className="font-semibold hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Dynamic Spacer */}
      <div style={{ height: `${navHeight}px` }}></div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-slate-600"
          aria-label="Scroll to top"
        >
          <FiChevronUp className="w-6 h-6 text-green-400" />
        </button>
      )}
    </>
  );
};

export default Navbar;