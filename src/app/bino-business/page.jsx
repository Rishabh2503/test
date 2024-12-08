'use client';

import React from 'react';
import Container from '@/components/Container';
import SearchIntro from '@/components/SearchIntro';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import dynamic from 'next/dynamic';

// Import Lottie animations
import networkAnimation from '@/lotties/network.json';
import partnerAnimation from '@/lotties/parternship.json';
import b2bAnimation from '@/lotties/b2b.json';
import distributionAnimation from '@/lotties/distribute.json';
import reachAnimation from '@/lotties/market.json';
import supportAnimation from '@/lotties/customer support.json';
import insightsAnimation from '@/lotties/Data Analytics.json';

// Dynamic import of LottieWrapper
const LottieWrapper = dynamic(() => import('@/components/LottieWrapper'), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
});

// Add this function before your BusinessPage component
const generateBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bino for Business",
    "description": "Connecting Customers, Brands, Retailers and Distributors for Growth",
    "url": "https://bino.bot/bino-business",
    "logo": "https://bino.bot/logo.png",
    "sameAs": [
      "https://twitter.com/binobot",
      "https://linkedin.com/company/binobot"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Join the Bino Network",
        "description": "Expand your reach and connect with our extensive network of distributors and retailers."
      },
      {
        "@type": "Offer",
        "name": "Preferred Partner",
        "description": "Get prioritized in customer inquiries for your area of expertise"
      },
      {
        "@type": "Offer",
        "name": "B2B Sourcing",
        "description": "Efficiently source products and services for your business with Bino Bot."
      },
      {
        "@type": "Offer",
        "name": "Distribution Support",
        "description": "Access Bino Bot's network of distributors to launch products or enter new regions."
      }
    ],
    "potentialAction": {
      "@type": "JoinAction",
      "name": "Join Bino Business",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://bino.bot/bino-business/get-started",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "B2B Distribution",
      "Business Networking",
      "Supply Chain Management",
      "Business Development"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bino Business Solutions",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Network Solutions",
          "description": "Business networking and distribution solutions"
        },
        {
          "@type": "OfferCatalog",
          "name": "Partnership Programs",
          "description": "Preferred partner and B2B sourcing programs"
        }
      ]
    }
  };

  return schema;
};

const BusinessPage = () => {
  const solutions = [
    {
      title: "Join the Bino Network",
      description: "Expand your reach and connect with our extensive network of distributors and retailers.",
      animation: networkAnimation,
      steps: [
        "Tell us your goals and areas of focus.",
        "Get introduced to relevant partners in our network.",
        "Expand your distribution channels seamlessly."
      ],
      link: "/join-network"
    },
    {
      title: "Preferred Partner",
      description: "Get prioritized in customer inquiries for your area of expertise",
      animation: partnerAnimation,
      steps: [
        "Submit your application to become a preferred partner.",
        "Our team will assess your application.",
        "Begin receiving priority leads."
      ],
      link: "/preferred-partner"
    },
    {
      title: "B2B Sourcing",
      description: "Efficiently source products and services for your business with Bino Bot.",
      animation: b2bAnimation,
      steps: [
        "Let us know what you need.",
        "Get options from trusted suppliers.",
        "Select the best offer for your business."
      ],
      link: "/b2b-sourcing"
    },
    {
      title: "Distribution Support",
      description: "Access Bino Bot's network of distributors to launch products or enter new regions.",
      animation: distributionAnimation,
      steps: [
        "Specify your desired regions or product launch needs.",
        "Get matched with distributors and retailers in target areas.",
        "Start reaching new customers quickly and efficiently."
      ],
      link: "/distribution-support"
    }
  ];

  const benefits = [
    {
      title: "Expansive Reach",
      description: "Expand your market reach with our established distribution network.",
      animation: reachAnimation
    },
    {
      title: "First-Rate Support",
      description: "Receive support from Bino Bot's dedicated partnership team.",
      animation: supportAnimation
    },
    {
      title: "Data-Driven Insights",
      description: "Benefit from valuable market insights to guide your growth.",
      animation: insightsAnimation
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <JsonLd data={generateBusinessSchema()} />
      
      <Container >
        <SearchIntro
          title="Grow Your Business with Bino for Business Platform"
          subtitle="Connecting Customers, Brands, Retailers and Distributors for Growth"
          centered={true}
        />

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-32 h-32 mx-auto mb-4">
                <LottieWrapper
                  animationData={solution.animation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
              <p className="text-gray-600 mb-6">{solution.description}</p>
              
              {/* Steps */}
              <div className="space-y-4 mb-6">
                {solution.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                      {stepIndex + 1}
                    </span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <Link 
                href={solution.link}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-sky-300 text-white rounded-xl p-12 my-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner with Bino</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <LottieWrapper
                    animationData={benefit.animation}
                    loop={true}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center my-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Drive Your Business Growth with Bino Bot?
          </h2>
          <p className="text-gray-600 mb-8">
            Whether you&apos;re looking to expand distribution, prioritize leads, or streamline sourcing, 
            Bino Bot has a solution for you.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </Container>
    </div>
  );
};

export default BusinessPage;