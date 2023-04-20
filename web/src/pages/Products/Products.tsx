import { FC, useEffect, useState } from 'react';
import axios from 'api/axios';

import { IProductCategory } from 'interfaces/IProductCategory';
import './Products.style.scss';
import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel';

const Products: FC = () => {
  const [_productCategories, _setProductCategories] = useState<IProductCategory[]>([]);

  const getCategories = () => {
    axios.get<IProductCategory[]>('v1/products-categories')
      .then(res => {
        _setProductCategories(res.data);
      })
      .catch(err => {
        console.log(err);
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