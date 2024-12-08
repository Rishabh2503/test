'use client';

import Clients from '@/components/Clients';
import ContactSection from '@/components/ContactSection';
import Container from '@/components/Container';
import FadeIn from '@/components/FadeIn';
import animationData from '../../public/Lottie/Animation1.json';
import Services from '@/components/Services';
import JsonLd from '@/components/JsonLd';
import dynamic from "next/dynamic";

// Dynamically import Lottie with no SSR
const DynamicLottie = dynamic(() => import('@/components/ClientLottie'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gray-200 rounded-lg" />
});

const generateHomeSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bino.bot/#website",
        "url": "https://bino.bot/",
        "name": "Bino Bot",
        // ... rest of your schema
      }
    ]
  };
};

export default function Home() {
  return (
    <main className='text-black'>
      <JsonLd data={generateHomeSchema()} />

      <div className='md:mt-12 sm:mt-32 flex items-center justify-center'>
        <FadeIn className='max-w-7xl md:flex items-center md:space-x-4 px-8'>
          <div>
            <h1 className='font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl'>
              Your search assistant on WhatsApp.
            </h1>
            <p className='mt-6 text-xl text-neutral-600'>
              FIND ANYTHING NEAR YOU!
            </p>
          </div>
          <div className='flex justify-center items-center h-full w-full md:ml-14'>
            <DynamicLottie
              animationData={animationData}
              loop={true}
            />
          </div>
        </FadeIn>
      </div>
      
      <Clients />
      <Services />
      <ContactSection />
    </main>
  );
}
