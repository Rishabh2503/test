import {
  ShoppingCart,
  Heart,
  ReceiptSwissFranc,
  Globe2,
  CarFront,
  PawPrint,
  House,
  Book
} from 'lucide-react';
import Container from './Container';
import FadeIn, { FadeInStagger } from './FadeIn';

const clients = [
  { name: 'Shopping', icon: <ShoppingCart /> },
  { name: 'Car Service', icon: <CarFront /> },
  { name: 'Travel', icon: <Globe2 /> },
  { name: 'Fitness', icon: <Heart /> },
  { name: 'Restaurant', icon: <ReceiptSwissFranc /> },
  { name: 'PetCare', icon: <PawPrint /> },
  { name: 'Real Estate', icon: <House /> },
  { name: 'Education', icon: <Book /> }
];

const Clients = () => {
  return (
    <div className='mt-24 rounded-4xl bg-sky-500 py-10 sm:mt-32 sm:py-32 lg:mt-56'>
      <Container>
        <FadeIn className='flex justify-center items-center gap-x-8'>
          <h2 className='text-center font-display text-4xl font-semibold tracking-wider text-white sm:text-left'>
            What are you looking for?
          </h2>
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role='list'
            className='mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4'>
            {clients.map(({ name, icon }) => (
              <li
                key={name} // Use the unique "name" property as the key
                className='flex flex-col justify-center items-center text-center'>
                <FadeIn>
                  <div
                    className='text-white text-[6rem] mb-4'
                    style={{ fontSize: '6rem' }}>
                    {icon}
                  </div>
                </FadeIn>
                <FadeIn>
                  <div className='text-white text-2xl font-semibold'>
                    {name}
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
};

export default Clients;
