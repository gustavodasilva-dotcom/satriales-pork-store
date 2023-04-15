import { FC } from 'react';
import { IProductsListProps } from './types';

const ProductsList: FC<IProductsListProps> = ({ checkout }) => {
  const _productsData = checkout?.products;

  return (
    <div>
      
    </div>
  );
};

export default ProductsList;