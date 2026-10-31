import { useState } from 'react';
import QuickStart from './components/QuickStart';
import SellerAssistant from './components/SellerAssistant';
import HeroSection from './components/HeroSection';
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
      <QuickStart />
      <section className="px-4 py-8"><h2 className="max-w-6xl mx-auto text-xl font-semibold">Opcional: organizar clientes en una hoja de cálculo</h2><SellerAssistant /></section>
      <BenefitsSection />
      <PhasesSection activePhase={activePhase} setActivePhase={setActivePhase} />
      <RepoSection />
      <section id="avanzado" className="scroll-mt-20 px-4 py-12 bg-gray-900/50">
        <details className="max-w-6xl mx-auto rounded-2xl border border-gray-700 p-6">
          <summary className="cursor-pointer text-xl font-semibold">Opcional: automatización y configuración avanzada</summary>
          <p className="text-gray-400 mt-4">Puedes trabajar con el asistente y tu hoja sin usar estas integraciones. Esta opción requiere configurar tus cuentas, permisos y servicios.</p>
          <ArchitectureSection />
          <HowItWorks />
        </details>
      </section>
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;

