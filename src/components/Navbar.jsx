import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // GSAP Animation for the Mobile Menu overlay
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power3.out" 
      });
    } else {
      gsap.to(menuRef.current, { 
        y: "-100%", 
        opacity: 0, 
        duration: 0.5, 
        ease: "power3.in" 
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Mission Control', href: '#home' },
    { name: 'Earth', href: '#earth' },
    { name: 'The Sun', href: '#sun' },
    { name: 'Deep Space', href: '#galaxy' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo */}
          <div className="flex-shrink-0 cursor-pointer z-50">
            <span className="text-white text-2xl font-bold tracking-[0.2em] uppercase">
              Odyssey
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
                >
                  {link.name}
                  {/* Micro-interaction: Hover underline effect */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="-mr-2 flex md:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated Hamburger Icon */}
              <div className="w-7 h-5 flex flex-col justify-between items-center relative">
                <span className={`w-full h-[2px] bg-white rounded-lg origin-left transition-all duration-300 ease-in-out ${isOpen ? 'rotate-[42deg] w-8' : ''}`} />
                <span className={`w-full h-[2px] bg-white rounded-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 translate-x-3' : ''}`} />
                <span className={`w-full h-[2px] bg-white rounded-lg origin-left transition-all duration-300 ease-in-out ${isOpen ? '-rotate-[42deg] w-8' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <div 
        ref={menuRef}
        className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl h-screen w-screen flex flex-col items-center justify-center -translate-y-full opacity-0 z-40"
      >
        <div className="flex flex-col items-center space-y-8 w-full px-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white block text-4xl font-light tracking-widest transition-colors duration-300 hover:scale-110 transform"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;