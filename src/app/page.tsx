import Hero from '@/components/sections/Hero/Hero';
import Services from '@/components/sections/Services/Services';
import About from '@/components/sections/About/About';
import Portfolio from '@/components/sections/Portfolio/Portfolio';
import Contact from '@/components/sections/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
    </>
  );
}
