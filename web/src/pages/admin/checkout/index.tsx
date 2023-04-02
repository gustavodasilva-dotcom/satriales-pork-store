import { FC, useState } from 'react';
import SearchProduct from './components/SearchProduct';
import ProductList from './components/ProductsList';
import { IProductCheckout } from 'interfaces/IProductCheckout';
import { Box } from '@mui/material';

const Checkout: FC = () => {
  const [_productsToList, _setProductToList] = useState<IProductCheckout[]>([]);

  return (
    <Box sx={{ display: 'flex' }}>
      <SearchProduct
        productsToList={_productsToList}
        setProductsToList={_setProductToList}
      />
      <ProductList productsToCheckout={_productsToList} />
    </Box>
  );
};

export default Checkout;