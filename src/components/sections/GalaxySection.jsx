import { useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";

import GalaxyModel from "./animations/GalaxyModel";

gsap.registerPlugin(ScrollTrigger);

const GalaxySection = () => {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Long pin for a dramatic ending
        pin: true,
        scrub: 1,
      },
    });

    // 1. The Great Zoom Out
    // We scale the canvas container down to simulate zooming out of the galaxy
    tl.fromTo(
      canvasContainerRef.current,
      { scale: 3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power2.inOut" },
      0
    );

    // 2. Cinematic Typography Reveal
    tl.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.3, duration: 1.5, ease: "power3.out" },
      1.5 // Start this right as the zoom-out settles
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="galaxy"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* 3D Canvas Container (Manipulated by GSAP) */}
      <div 
        ref={canvasContainerRef} 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-0 scale-[3]"
      >
        <Canvas camera={{ position: [0, 8, 12], fov: 60 }} className="w-full h-full touch-none">
          <Suspense fallback={null}>
            {/* The Galaxy is tilted slightly using rotation on the X axis to see the spiral */}
            <GalaxyModel rotation={[-Math.PI / 4, 0, 0]} />
          </Suspense>
        </Canvas>
      </div>

      {/* Cinematic Final Typography Overlay */}
      <div 
        ref={textRef} 
        className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none mt-20"
      >
        <h2 className="text-[10px] md:text-sm tracking-[0.5em] text-blue-400 font-mono uppercase mb-4 drop-shadow-md">
          Transmission Concluded
        </h2>
        
        <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          The End
        </h1>
        
        <p className="mt-8 text-sm md:text-base text-gray-400 font-light tracking-widest max-w-xl text-center px-4 mix-blend-screen">
          You have reached the edge of the known universe. The cosmos continues infinitely, but our journey stops here.
        </p>

        {/* Return to Base Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-16 pointer-events-auto group relative px-8 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/[0.1] transition-all duration-300"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white group-hover:text-blue-400 transition-colors">
            Return to Base
          </span>
          {/* Subtle button glow */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        </button>
      </div>
    </section>
  );
};

export default GalaxySection;