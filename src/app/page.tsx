import Header from "@/components/site/Header";
import ScrollHandler from "@/components/ScrollHandler";
import MyWork from "@/components/site/MyWork";
import ServicesSection from "@/components/site/ServiceSection";
import CounterSection from "@/components/site/CounterSection";
import EducationSection from "@/components/site/EducationSection";
import SkillSection from "@/components/site/SkillSection";
import TestimonialSection from "@/components/site/TestimonialSection";
import FAQSection from "@/components/site/FAQSection";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";
import HeroSection from "@/components/site/HeroSection";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <HeroSection />
        {/* My Work Section */}
        <MyWork />
        {/* Services Section */}
        <ServicesSection />
        {/* Counter Section */}
        <CounterSection />
        {/* Education Section */}
        <EducationSection />
        {/* Skill Section */}
        <SkillSection />
        {/* Testimonial Section */}
        <TestimonialSection />
        {/* FAQ Section */}
        <FAQSection />
        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
      <ScrollHandler />
    </>
  );
}
