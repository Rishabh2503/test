'use client';
import Clients from '@/components/Clients';
import ContactSection from '@/components/ContactSection';
import Container from '@/components/Container';
import FadeIn from '@/components/FadeIn';
import animationData from '../../public/Lottie/Animation1.json';
import Services from '@/components/Services';
import Lottie from 'lottie-react';

// Generate comprehensive schema for the home page
const generateHomePageSchema = () => {
  const schemas = [
    // WebSite Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bino Bot",
      "url": "https://bino.bot",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://bino.bot/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // SoftwareApplication Schema
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Bino Bot",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "WhatsApp",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1000"
      }
    },
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bino Bot",
      "url": "https://bino.bot",
      "logo": "https://bino.bot/logo.png",
      "sameAs": [
        "https://facebook.com/binobot",
        "https://twitter.com/binobot",
        "https://instagram.com/binobot",
        "https://linkedin.com/company/binobot"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    },
    // Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Search Assistant",
      "provider": {
        "@type": "Organization",
        "name": "Bino Bot"
      },
      "description": "Your search assistant on WhatsApp. Find anything near you!",
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://wa.me/your-whatsapp-number",
        "servicePhone": "+91-XXXXXXXXXX"
      }
    },
    // FAQPage Schema (if you have FAQs)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Bino Bot work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bino Bot is a WhatsApp-based search assistant that helps you find anything near you. Simply send your query through WhatsApp, and get instant results."
          }
        },
        {
          "@type": "Question",
          "name": "Is Bino Bot free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Bino Bot is completely free for users to search and find local businesses and services."
          }
        }
      ]
    }
  ];

  return schemas;
};

export default function Home() {
  return (
    <main className='text-black'>
      {/* Add Schema.org JSON-LD */}
      {generateHomePageSchema().map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}

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
          <Lottie
            animationData={animationData}
            className='flex justify-center items-center h-full w-full md:ml-14'
            loop={true}
          />
        </FadeIn>
      </div>
      
      <Clients />
      <Services />
      <ContactSection />
    </main>
  );
}
