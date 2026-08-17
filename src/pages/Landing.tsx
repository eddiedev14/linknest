import { SEO } from "@/shared/components/SEO";
import { Navbar } from "@/shared/components/landing/NavBar";
import { Hero } from "@/shared/components/landing/Hero";
import { Features } from "@/shared/components/landing/Features";
import { HowItWorks } from "@/shared/components/landing/HowItWorks";
import { CTA } from "@/shared/components/landing/CTA";
import { Footer } from "@/shared/components/landing/Footer";

const Landing = () => {
  return (
    <>
      <SEO
        title="LinkNest — Professional profiles for developers"
        description="Create a single professional profile with all your links: GitHub, portfolio, socials and more.
Free and built for developers."
        path="/"
      />

      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};

export default Landing;
