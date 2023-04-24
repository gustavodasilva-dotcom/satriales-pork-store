import { FC } from 'react';
import { motion } from 'framer-motion';

import './ProductImagesCarousel.style.scss';
import { IProductImagesCarouselProps } from './ProductImagesCarousel.types';
import ImageCarousel from './ImageCarousel/ImageCarousel';

const ProductImagesCarousel: FC<IProductImagesCarouselProps> = ({ images }) => {
  return (
    <motion.div
      className='ProductImagesCarousel'
      whileTap={{ cursor: 'grabbing' }}
    >
      <ImageCarousel images={images} />
    </motion.div>
  );
};

export default ProductImagesCarousel;