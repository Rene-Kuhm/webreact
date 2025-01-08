import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Portfolio from '@/components/Portfolio/Portfolio';
import Testimonials from '@/components/Testimonials/Testimonials';
import Timeline from '@/components/Timeline/Timeline';
import ContactCTA from '@/components/ContactCTA/ContactCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Testimonials />
      <Timeline />
      <ContactCTA />
    </main>
  );
}