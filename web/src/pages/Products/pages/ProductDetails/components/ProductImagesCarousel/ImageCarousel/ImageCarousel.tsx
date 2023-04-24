import { FC } from 'react';
import { motion } from 'framer-motion';

import { IImageCarouselProps } from './ImageCarousel.types';
import './ImageCarousel.style.scss';

const ImageCarousel: FC<IImageCarouselProps> = ({ images }) => {
  return (
    <motion.div
      className='ImageCarousel'
      drag='x'
    >
      {images.map((image, index) => (
        <motion.div key={index}>
          <img src={''} alt={image.name} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageCarousel;