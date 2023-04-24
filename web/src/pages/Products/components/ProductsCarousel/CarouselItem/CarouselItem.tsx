import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';

import { IProduct } from 'interfaces/IProduct';
import { plainModal } from 'utils/Modals';

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

  const _navigate = useNavigate();

  const _loadProducts = () => {
    axios.get<IProduct[]>(`v1/products/${_id}/category`)
      .then(res => {
        const data = res.data;
        _setProducts(data);
      })
      .catch(() => {
        const message = 'Error while contacting the server';

        plainModal({
          type: 'error',
          message
        });
      });
  };

  const _onLoad = () => {
    _loadProducts();
    _setWidth(carouselRef.current!.scrollWidth - carouselRef.current!.offsetWidth);
  };

  const _handleAddToCart = () => {
    plainModal({
      type: 'warning',
      message: 'This function is not available right now!'
    });
  };

  useEffect(() => {
    _onLoad();
  }, []);

  return (
    <motion.div
      className='CarouselItem'
      drag='x'
      dragConstraints={{ right: 0, left: -_width }}
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
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
            <button
              className='see-more'
              onClick={() => _navigate(`details/${product._id}`)}
            >
              See more
            </button>
            <button
              className='add-to-cart'
              onClick={_handleAddToCart}
            >
              <FaShoppingCart />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CarouselItem;