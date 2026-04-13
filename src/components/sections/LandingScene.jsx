import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingScene = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const hudRef = useRef(null);
  const starsRef = useRef([]);
  const scrollIndicatorRef = useRef(null);

  // Generate a static array of random stars so they don't jump on re-renders
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random(),
      depth: Math.random() * 3 // Used for parallax speed
    }));
  }, []);

  useEffect(() => {
    // --- 1. Cinematic Entrance Timeline ---
    const entranceTl = gsap.timeline();

    entranceTl
      .fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      )
      .fromTo(titleRef.current.children, 
        { y: 100, opacity: 0, rotateX: -45 }, 
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.2, ease: "expo.out" },
        "-=0.5"
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(hudRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
        "-=0.5"
      )
      .fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", repeat: -1, yoyo: true },
        "-=0.5"
      );

    // --- 2. Scroll-Triggered Spaceship Movement ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
        pin: true, // Pin the section while scrolling through the timeline
      }
    });

    // Animate text moving towards camera and fading
    scrollTl.to([titleRef.current, subtitleRef.current, hudRef.current, scrollIndicatorRef.current], {
      scale: 1.5,
      opacity: 0,
      y: -100,
      filter: "blur(20px)",
      duration: 1,
      ease: "power2.in"
    }, 0);

    // Animate stars splitting outward to simulate forward movement
    starsRef.current.forEach((star, index) => {
      const depth = stars[index].depth;
      const xOffset = (stars[index].x - 50) * depth * 2; 
      const yOffset = (stars[index].y - 50) * depth * 2;

      scrollTl.to(star, {
        x: `+=${xOffset}vw`,
        y: `+=${yOffset}vh`,
        scale: depth * 2,
        opacity: 0,
        duration: 1,
        ease: "power1.in"
      }, 0);
    });

    return () => {
      entranceTl.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [stars]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden perspective-[1000px]"
    >
      {/* Deep Space Gradients / Nebula Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50 z-0"></div>

      {/* Generated Parallax Starfield */}
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            ref={el => starsRef.current[i] = el}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        
        {/* Glassmorphic HUD / Data Panel */}
        <div 
          ref={hudRef}
          className="absolute left-6 md:left-12 top-1/3 hidden lg:flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-64"
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs tracking-widest text-emerald-400 font-mono uppercase">System Online</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Current Sector</span>
            <span className="text-sm text-white font-mono">Alpha-Centauri / 88.2</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Engine Output</span>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[78%]"></div>
            </div>
          </div>
        </div>

        {/* Cinematic Typography */}
        <div className="text-center mt-20 flex flex-col items-center">
          <h1 
            ref={titleRef} 
            className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-[0.05em] leading-none flex overflow-hidden mix-blend-screen"
            style={{ textShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
          >
            {/* Wrapping words in spans for GSAP stagger effects */}
            <span className="block translate-y-[100%]">Cosmic</span>
            <span className="block translate-y-[100%] ml-4 md:ml-8 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600">Odyssey</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="mt-8 text-lg md:text-2xl text-gray-400 font-light tracking-widest max-w-2xl text-center"
          >
            Initiate scroll sequence to explore the frontier.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Engage</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </div>

      </div>
    </section>
  );
};

export default LandingScene;