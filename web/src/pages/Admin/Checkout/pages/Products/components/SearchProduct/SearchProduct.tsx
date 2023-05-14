import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';

import { plainModal } from 'utils/Modals';
import ProductSearch from 'components/Admin/ProductSearch/ProductSearch';

import { IProduct } from 'interfaces/IProduct';
import { ISearchProductProps } from './types';

const SearchProduct: FC<ISearchProductProps> = ({
  productsToList,
  setProductsToList
}) => {
  const [_productFound, _setProductFound] = useState<IProduct | undefined>();
  const [_productBarCode, _setProductBarCode] = useState('');
  const [_productQtt, _setProductQtt] = useState('1');
  const [_productTotalPrice, _setProductTotalPrice] = useState('');

  const _productQttRef = useRef<HTMLInputElement>(null);
  const _addProductRef = useRef<HTMLButtonElement>(null);

  const _goToAddProduct = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') _addProductRef.current?.focus();
  };

  const _goToProductQtt = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') _productQttRef.current?.focus();
  }

  const _handleQuantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const quantity = e.target.value;
    _setProductQtt(quantity);

    const productQuantity = _productFound?.stock; 
    if (productQuantity && Number(quantity) > productQuantity.valueOf()) {
      plainModal({
        type: 'warning',
        message: "It's no possible to sell more than what's stocked"
      });
      _setProductQtt('');
      return;
    }

    if (!quantity) {
      _setProductTotalPrice('');
      return;
    }

    if (!_productFound?.price.$numberDecimal) {
      alert(`This product doesn't have a price registered`);
      return;
    }

    const totalPrice = parseFloat(_productFound.price.$numberDecimal) * Number(quantity);
    _setProductTotalPrice(totalPrice.toFixed(2));
  };

  const _addProduct = () => {
    setProductsToList([...productsToList, {
      quantity: Number(_productQtt),
      product: _productFound
    }]);

    _setProductBarCode('');
    _setProductQtt('1');
    _setProductFound(undefined);
  };

  useEffect(() => {
    if (_productFound) {
      const _price = _productFound.price.$numberDecimal ? _productFound.price.$numberDecimal : '';
      _setProductTotalPrice(_price);
      _setProductBarCode(_productFound.barCode.toString());
    }
  }, [_productFound]);

  return (
    <Box>
      <ProductSearch
        setProductFound={_setProductFound}
        productBarCode={_productBarCode}
        setProductBarCode={_setProductBarCode}
        nextElement={_goToProductQtt}
      />
      {_productFound && (
        <Paper sx={{ width: 500, p: 2 }}>
          <TextField
            type='text'
            label='Name'
            value={_productFound.name}
            fullWidth
            margin='dense'
            disabled
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              type='text'
              label='Unitary price'
              value={Number(_productFound.price.$numberDecimal).toFixed(2)}
              sx={{ marginRight: 2 }}
              margin='dense'
              disabled
            />
            <TextField
              type='text'
              label='Total product price'
              value={Number(_productTotalPrice).toFixed(2)}
              margin='dense'
              disabled
            />
          </Box>
          <TextField
            type='number'
            label='Quantity'
            inputRef={_productQttRef}
            value={_productQtt}
            onChange={_handleQuantity}
            onKeyDown={_goToAddProduct}
            margin='dense'
          />
          <Box sx={{ marginTop: 2 }}>
            <Button
              type='button'
              variant='contained'
              ref={_addProductRef}
              onClick={_addProduct}
            >
              Add Product
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SearchProduct;