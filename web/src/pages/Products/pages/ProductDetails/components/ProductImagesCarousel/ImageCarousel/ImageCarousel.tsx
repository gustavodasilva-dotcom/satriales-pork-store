import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import bufferToBase64 from 'utils/BufferToBase64';

import { IImageCarouselProps } from './ImageCarousel.types';
import './ImageCarousel.style.scss';

const ImageCarousel: FC<IImageCarouselProps> = ({
  images,
  carouselRef
 }) => {
  const [_width, _setWidth] = useState(0);

  const _onLoad = () => {
    _setWidth(carouselRef.current!.scrollWidth - carouselRef.current!.offsetWidth);
  };

  useEffect(() => {
    _onLoad();
  }, []);
  
  return (
    <motion.div
      className='ImageCarousel'
      drag='x'
      dragConstraints={{ right: 0, left: -_width }}
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {images.map((image, index) => (
        <motion.div
          className='product-image'
          key={index}
        >
          <img
            src={`data:image/png;base64,${bufferToBase64(image.image.data)}`}
            alt={image.name}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageCarousel;