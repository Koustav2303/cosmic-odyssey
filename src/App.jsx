import Navbar from './components/Navbar';
import LandingScene from './components/sections/LandingScene';
import EarthSection from './components/sections/EarthSection';
import SunSection from './components/sections/SunSection';
import GalaxySection from './components/sections/GalaxySection';

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <LandingScene />
        <EarthSection />
        <SunSection />
        <GalaxySection />
      </main>
    </div>
  );
}

export default App;