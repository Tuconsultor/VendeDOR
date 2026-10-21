import { useState } from 'react';
import GuideSection from './components/GuideSection';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import PhasesSection from './components/PhasesSection';
import ArchitectureSection from './components/ArchitectureSection';
import HowItWorks from './components/HowItWorks';
import RepoSection from './components/RepoSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <PhasesSection activePhase={activePhase} setActivePhase={setActivePhase} />
      <ArchitectureSection />
      <HowItWorks />
      <GuideSection />
      <RepoSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
