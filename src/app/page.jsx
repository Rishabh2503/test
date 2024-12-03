"use client";
import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
// import LottieAnimation from "@/components/LottieAnimation";
import Services from "@/components/Services";
export default function Home() {
  return (
    <main className="text-black">
      <Container className="mt-24 sm:mt-32">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          Your search assistant on WhatsApp.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
          FIND ANYTHING NEAR YOU!
          </p>
        </FadeIn>
        {/* <LottieAnimation /> */}
      </Container>
      <Clients />
      
      <Services />
      <ContactSection />
    </main>
  );
}
