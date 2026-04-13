import { useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import SunModel from "./animations/SunModel";

gsap.registerPlugin(ScrollTrigger);

const SunSection = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const flashRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=100%" : "+=150%",
        pin: true,
        scrub: 1,
      },
    });

    // 1. The Solar Flash Effect (Heat Distortion Transition)
    tl.fromTo(
      flashRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.5, ease: "power2.out" },
      0
    );

    // 2. Bento Box Stagger (Sliding in from the left)
    panelsRef.current.forEach((panel, index) => {
      tl.fromTo(
        panel,
        { x: -50, opacity: 0, filter: "blur(10px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
        index * 0.15
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="sun"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col-reverse lg:flex-row items-center pt-24 lg:pt-0"
    >
      {/* Background Heat Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_right,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black z-0 pointer-events-none"></div>

      {/* The Solar Flash Div (Fades out via GSAP) */}
      <div ref={flashRef} className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center h-full">
        
        {/* Left/Bottom Column: Bento Box Information Panels */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-y-auto lg:overflow-visible pb-12 lg:pb-0 scrollbar-hide flex flex-col justify-center">
          
          <div className="mb-4 lg:mb-6 text-center lg:text-left">
            <h2 className="text-xs lg:text-sm tracking-[0.3em] text-orange-500 font-mono uppercase mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
              Sector 00
            </h2>
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-wider text-white drop-shadow-lg">
              Sol
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-xl mx-auto lg:mx-0 w-full">
            
            {/* Bento Card 1: Star Class */}
            <div
              ref={(el) => (panelsRef.current[0] = el)}
              className="col-span-2 bg-orange-900/[0.05] backdrop-blur-xl border border-orange-500/20 p-6 lg:p-8 rounded-2xl lg:rounded-3xl hover:bg-orange-900/[0.1] transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-600"></div>
              <h4 className="text-orange-200/50 text-[10px] lg:text-xs uppercase tracking-widest mb-2">
                Stellar Classification
              </h4>
              <div className="flex items-end justify-between">
                <span className="text-3xl lg:text-4xl font-light text-white">G-Type</span>
                <span className="text-sm font-mono text-orange-400">Main-Sequence</span>
              </div>
            </div>

            {/* Bento Card 2: Core Temp */}
            <div
              ref={(el) => (panelsRef.current[1] = el)}
              className="col-span-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-2xl lg:rounded-3xl flex flex-col justify-between hover:border-orange-500/30 transition-colors duration-300 group"
            >
              <h4 className="text-orange-200/50 text-[10px] lg:text-xs uppercase tracking-widest mb-2 group-hover:text-orange-400 transition-colors">
                Core Temp
              </h4>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-light text-white">15M</span>
                <span className="text-xs text-orange-500/80 font-mono">Celsius</span>
              </div>
            </div>

            {/* Bento Card 3: Mass */}
            <div
              ref={(el) => (panelsRef.current[2] = el)}
              className="col-span-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-2xl lg:rounded-3xl flex flex-col justify-between hover:border-orange-500/30 transition-colors duration-300"
            >
              <h4 className="text-orange-200/50 text-[10px] lg:text-xs uppercase tracking-widest mb-2">
                Solar Mass
              </h4>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-light text-white">333K</span>
                <span className="text-xs text-orange-500/80 font-mono">x Earth</span>
              </div>
            </div>

            {/* Bento Card 4: Desc */}
            <div
              ref={(el) => (panelsRef.current[3] = el)}
              className="col-span-2 bg-gradient-to-tl from-orange-900/20 to-red-900/10 backdrop-blur-xl border border-orange-500/20 p-5 lg:p-6 rounded-2xl lg:rounded-3xl relative overflow-hidden"
            >
              <p className="text-xs lg:text-sm text-gray-300 font-light leading-relaxed relative z-10">
                A nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. It radiates energy primarily as light and infrared radiation, anchoring the entire system.
              </p>
            </div>
            
          </div>
        </div>

        {/* Right/Top Column: The 3D Sun */}
        <div className="w-full h-[40vh] lg:h-[700px] lg:w-1/2 relative flex justify-center items-center shrink-0">
          
          {/* Insane Ambient Heat Glow behind the canvas */}
          <div className="absolute w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-orange-600/30 rounded-full blur-[100px] lg:blur-[150px] mix-blend-screen -z-10 pointer-events-none animate-pulse"></div>

          {/* THE FIX: Camera pulled back to z: 14 to avoid clipping */}
          <Canvas camera={{ position: [0, 0, 14], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing touch-none">
            <Suspense fallback={null}>
              
              {/* THE FIX: Scaled the sun up slightly so it fills the new camera distance beautifully */}
              <SunModel scale={1.2} />
              
              <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  );
};

export default SunSection;