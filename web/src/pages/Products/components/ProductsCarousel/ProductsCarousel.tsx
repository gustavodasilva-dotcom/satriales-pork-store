import { useRef } from 'react';
import { motion } from 'framer-motion';

import CarouselItem from './CarouselItem';

import { IProductsCarouselProps } from './ProductsCarousel.types';
import './ProductsCarousel.scss';

const ProductsCarousel: React.FC<IProductsCarouselProps> = ({ category }) => {
  const _carouselRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className='CardCarousel'
      ref={_carouselRef}
      whileTap={{ cursor: 'grabbing' }}
    >
      <CarouselItem
        category={category}
        carouselRef={_carouselRef}
      />
    </motion.div>
  );
};

export default ProductsCarousel;