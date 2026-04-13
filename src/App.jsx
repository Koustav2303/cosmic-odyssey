import Navbar from './components/Navbar';
import LandingScene from './components/sections/LandingScene';
import EarthSection from './components/sections/EarthSection';
import SunSection from './components/sections/SunSection';

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <LandingScene />
        <EarthSection />
        <SunSection />
        
        {/* Final spacer to allow scrolling past the Sun into Deep Space */}
        <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center border-t border-white/5">
           <h2 className="text-sm tracking-[0.5em] text-gray-500 font-mono uppercase mb-4">Warning</h2>
           <h3 className="text-3xl font-light text-white tracking-widest">Leaving Local System</h3>
        </div>
      </main>
    </div>
  );
}

export default App;