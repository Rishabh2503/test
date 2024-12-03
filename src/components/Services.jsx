import React from 'react';
import SectionIntro from './SectionIntro';
import Container from './Container';
import FadeIn from './FadeIn';
import StylizedImage from './StylizedImage';
import imageLaptop from '../images/laptop.jpg';
import List, { ListItem } from './List';

const Services = () => {
  return (
    <>
      <SectionIntro
        eyebrow='How Bino works'
        title='Discover How Bino Connects You with Local Products!'
        className='mt-24 sm:mt-32 lg:mt-40'>
        <p>
          Search for Healthcare, Pet Services, Education, Restaurants and many
          more!
        </p>
      </SectionIntro>
      <Container className='mt-16'>
        <div className='lg:flex lg:items-center lg:justify-end'>
          <div className='flex justify-center lg:w-1/2 lg:justify-end lg:pr-12'>
            <FadeIn className='w-[33.75rem] flex-none lg:w-[45rem]'>
              <StylizedImage
                src={imageLaptop}
                sizes='(min-width: 1024px) 41rem, 31rem'
                className='justify-center lg:justify-end'
              />
            </FadeIn>
          </div>
          {/* List item */}
          <List className='mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4'>
            <ListItem title='Beautiful Marketing Pages'>
              We specialize in crafting stunning, high-quality marketing pages
              designed to captivate your audience and drive results.
            </ListItem>
            <ListItem title='Beyond Lorem Ipsum'>
              Leave the generic content behind. We create compelling marketing
              copy that tells your brand story and resonates with your target
              market.
            </ListItem>
            <ListItem title='Unleash Your Content Power'>
              A robust and customized CMS is essential for managing your online
              presence. We offer tailored solutions that give you complete
              control over your content, from creation to publication.
            </ListItem>
            <ListItem title='E-commerce '>
              We&apos;re at the forefront of modern e-commerce development.
              Forget cookie-cutter templates; we craft custom storefronts that
              deliver a seamless shopping experience for your customers.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
};

export default Services;
