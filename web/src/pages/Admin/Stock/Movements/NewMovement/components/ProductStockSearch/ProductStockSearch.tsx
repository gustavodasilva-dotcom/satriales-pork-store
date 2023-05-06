import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import ProductSearch from 'components/Admin/ProductSearch';

import { IProductStockSearchProps } from './ProductStockSearch.types';

const ProductStockSearch: FC<IProductStockSearchProps> = ({
  setShowForm,
  productFound,
  setProductFound
}) => {
  const [_productBarCode, _setProductBarCode] = useState<string>('');

  useEffect(() => {
    if (productFound)
      _setProductBarCode(productFound.barCode.toString());
  }, [productFound]);

  return (
    <Box>
      <ProductSearch
        setProductFound={setProductFound}
        productBarCode={_productBarCode}
        setProductBarCode={_setProductBarCode}
      />
      {productFound && (
        <Box>
          <Box>
            <TextField
              type='text'
              label='Product name'
              value={productFound.name}
              sx={{ mr: 2.5 }}
              margin='dense'
              disabled
            />
            <TextField
              type='text'
              label='Product quantity'
              value={productFound.stock ?? 0}
              margin='dense'
              disabled
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              type='button'
              variant='contained'
              onClick={() => setShowForm(true)}
            >
              New movement
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductStockSearch;