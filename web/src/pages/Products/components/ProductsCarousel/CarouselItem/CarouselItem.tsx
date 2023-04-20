import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'api/axios';

import { IProduct } from 'interfaces/IProduct';

import { ICarouselItemProps } from './CarouselItem.types';
import imageExample from 'assets/fettuccine.jpeg';
import './CarouselItem.style.scss';

const CarouselItem: FC<ICarouselItemProps> = ({
  category,
  carouselRef
}) => {
  const { _id } = category;

  const [_width, _setWidth] = useState(0);
  const [_products, _setProducts] = useState<IProduct[]>([]);

  const _loadProducts = () => {
    axios.get<IProduct[]>(`v1/products/${_id}/category`)
      .then(res => {
        const data = res.data;
        _setProducts(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _onLoad = () => {
    _loadProducts();
    _setWidth(carouselRef.current!.scrollWidth - carouselRef.current!.offsetWidth);
  };

  useEffect(() => {
    _onLoad();
  }, []);

  return (
    <motion.div
      className='CarouselItem'
      drag='x'
      dragConstraints={{ right: 0, left: -_width }}
    >
      {_products.map((product) => (
        <motion.div
          className='card-item'
          key={product._id}
        >
          <div className='product-image'>
            <img src={imageExample} alt={product.name} />
          </div>
          <div className='product-name'>
            <h2>{product.name}</h2>
          </div>
          <div className='product-price'>
            <span>$ {parseFloat(product.price.$numberDecimal).toFixed(2)}</span>
          </div>
          <div className='button-wrapper'>
            <button>
              Add to cart
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CarouselItem;