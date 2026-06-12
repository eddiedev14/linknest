import Navbar from "@/shared/components/landing/NavBar";
import Hero from "@/shared/components/landing/Hero";
import Features from "@/shared/components/landing/Features";
import HowItWorks from "@/shared/components/landing/HowItWorks";
import CTA from "@/shared/components/landing/CTA";
import Footer from "@/shared/components/landing/Footer";

export const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};
