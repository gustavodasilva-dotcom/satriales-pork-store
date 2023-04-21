import { FC, useEffect, useState } from 'react';

import axios from 'api/axios';
import { plainModal } from 'utils/Modals';

import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel';
import { IProductCategory } from 'interfaces/IProductCategory';
import './Products.style.scss';

const Products: FC = () => {
  const [_productCategories, _setProductCategories] = useState<IProductCategory[]>([]);

  const getCategories = () => {
    axios.get<IProductCategory[]>('v1/products-categories')
      .then(res => {
        _setProductCategories(res.data);
      })
      .catch(error => {
        let message: string;

        if (error?.response?.status === 404) {
          message = 'Client not found';
        } else {
          message = 'Error while contacting the server';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='Products'>
      {_productCategories.map((category, index) => (
        <div
          key={index}
          className='card-container'
        >
          <h1 className='card-title'>
            {category.name}
          </h1>
          <ProductsCarousel
            category={category}
          />
        </div>
      ))}
    </div>
  );
};

export default Products;