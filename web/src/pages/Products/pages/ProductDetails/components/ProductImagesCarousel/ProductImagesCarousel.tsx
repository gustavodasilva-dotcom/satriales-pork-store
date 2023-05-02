import { FC, useRef } from 'react';
import { motion } from 'framer-motion';

import './ProductImagesCarousel.style.scss';
import { IProductImagesCarouselProps } from './ProductImagesCarousel.types';
import ImageCarousel from './ImageCarousel/ImageCarousel';

const ProductImagesCarousel: FC<IProductImagesCarouselProps> = ({ images }) => {
  const _carouselRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      className='ProductImagesCarousel'
      whileTap={{ cursor: 'grabbing' }}
      ref={_carouselRef}
    >
      <ImageCarousel
        images={images}
        carouselRef={_carouselRef}
      />
    </motion.div>
  );
};

export default ProductImagesCarousel;