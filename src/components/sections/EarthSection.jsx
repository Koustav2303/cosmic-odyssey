import { useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Html, useProgress } from "@react-three/drei";

import EarthModel from "./animations/EarthModel";

gsap.registerPlugin(ScrollTrigger);

// Custom Cinematic Loader to handle the large texture download gracefully
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        <div className="text-blue-400 font-mono text-xs tracking-widest uppercase whitespace-nowrap shadow-black drop-shadow-md bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
          Initializing Terra... {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

const EarthSection = () => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    // Check if on mobile to adjust the pin duration
    const isMobile = window.innerWidth < 1024;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=100%" : "+=150%", // Shorter pin distance on mobile
        pin: true,
        scrub: 1,
      },
    });

    // Tighter staggered entrance for the bento boxes
    panelsRef.current.forEach((panel, index) => {
      tl.fromTo(
        panel,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
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
      id="earth"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col lg:flex-row items-center pt-24 lg:pt-0"
    >
      {/* Background Starfield Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center h-full">
        
        {/* Left/Top Column: The 3D Planet */}
        <div className="w-full h-[40vh] lg:h-[700px] lg:w-1/2 relative flex justify-center items-center shrink-0">
          
          {/* Intense Ambient UI Glow behind the planet */}
          <div className="absolute w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-blue-500/20 rounded-full blur-[80px] lg:blur-[120px] mix-blend-screen -z-10 pointer-events-none"></div>

          <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing touch-none">
  <Suspense fallback={<Loader />}>
    <Environment preset="night" />
    
    {/* Cinematic 3-Point Lighting */}
    <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
    <ambientLight intensity={0.05} color="#b1c8e8" />
    <spotLight position={[-5, 5, -5]} intensity={50} color="#3b82f6" penumbra={1} />

    <EarthModel />

    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
  </Suspense>
</Canvas>
        </div>

        {/* Right/Bottom Column: Bento Box Information Panels */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto overflow-y-auto lg:overflow-visible pb-12 lg:pb-0 scrollbar-hide flex flex-col justify-center">
          
          <div className="mb-4 lg:mb-6 text-center lg:text-left">
            <h2 className="text-xs lg:text-sm tracking-[0.3em] text-blue-400 font-mono uppercase mb-2">
              Sector 01
            </h2>
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-wider text-white drop-shadow-lg">
              Terra
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-xl mx-auto lg:mx-0 w-full">
            
            {/* Bento Card 1: Composition */}
            <div
              ref={(el) => (panelsRef.current[0] = el)}
              className="col-span-2 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 lg:p-8 rounded-2xl lg:rounded-3xl hover:bg-white/[0.04] transition-colors duration-300"
            >
              <h4 className="text-gray-400 text-[10px] lg:text-xs uppercase tracking-widest mb-4">
                Atmospheric Composition
              </h4>
              <div className="flex flex-col sm:flex-row items-end gap-4 lg:gap-6">
                <div className="w-full flex-1">
                  <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-300">
                    <span>Nitrogen</span>
                    <span className="text-blue-400">78%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-blue-500 w-[78%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  </div>
                </div>
                <div className="w-full flex-1">
                  <div className="flex justify-between text-xs font-mono mb-1.5 text-gray-300">
                    <span>Oxygen</span>
                    <span className="text-emerald-400">21%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-emerald-500 w-[21%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Gravity */}
            <div
              ref={(el) => (panelsRef.current[1] = el)}
              className="col-span-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-2xl lg:rounded-3xl flex flex-col justify-between hover:border-blue-500/30 transition-colors duration-300 group"
            >
              <h4 className="text-gray-400 text-[10px] lg:text-xs uppercase tracking-widest mb-2 group-hover:text-blue-400 transition-colors">
                Gravity
              </h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl lg:text-4xl font-light text-white">9.8</span>
                <span className="text-xs text-gray-500 font-mono">m/s²</span>
              </div>
            </div>

            {/* Bento Card 3: Moons */}
            <div
              ref={(el) => (panelsRef.current[2] = el)}
              className="col-span-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-2xl lg:rounded-3xl flex flex-col justify-between hover:border-white/20 transition-colors duration-300 relative overflow-hidden group"
            >
              <h4 className="text-gray-400 text-[10px] lg:text-xs uppercase tracking-widest mb-2">
                Satellites
              </h4>
              <span className="text-3xl lg:text-4xl font-light text-white">01</span>
              {/* Animated Radar Rings */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border border-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            </div>

            {/* Bento Card 4: Desc */}
            <div
              ref={(el) => (panelsRef.current[3] = el)}
              className="col-span-2 bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-xl border border-blue-500/20 p-5 lg:p-6 rounded-2xl lg:rounded-3xl relative overflow-hidden"
            >
              {/* Techy Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
              <p className="text-xs lg:text-sm text-gray-300 font-light leading-relaxed relative z-10">
                The only known astronomical object to harbor life. Its surface
                is dominated by vast liquid water oceans, generating complex
                weather systems and sustaining a fragile biosphere.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarthSection;