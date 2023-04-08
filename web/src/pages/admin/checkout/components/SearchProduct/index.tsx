import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Paper, TextField, Tooltip } from '@mui/material';
import { HelpOutlineRounded } from '@mui/icons-material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IProduct } from 'interfaces/IProduct';
import AdvancedSearch from './components/AdvancedSearch';
import { ISearchProductProps } from './types';

const SearchProduct: FC<ISearchProductProps> = ({
  productsToList,
  setProductsToList
}) => {
  const [_products, _setProducts] = useState<IProduct[]>([]);
  const [_productFound, _setProductFound] = useState<IProduct | undefined>();
  const [_productBarCode, _setProductBarCode] = useState('');
  const [_productQtt, _setProductQtt] = useState('1');
  const [_productTotalPrice, _setProductTotalPrice] = useState('');
  const [_openAdvencedSearch, _setOpenAdvencedSearch] = useState(false);

  const _productBarCodeRef = useRef<HTMLInputElement>(null);
  const _productQttRef = useRef<HTMLInputElement>(null);
  const _addProductRef = useRef<HTMLButtonElement>(null);

  const _axiosPrivate = useAxiosPrivate();

  const _getProducts = () => {
    _axiosPrivate.get<IProduct[]>('v2/products')
      .then(response => {
        _setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const _goToAddProduct = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') _addProductRef.current?.focus();
  };

  const _goToProductQtt = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') _productQttRef.current?.focus();
  }

  const _handleSearchBarCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const barCode = e.target.value;
    _setProductBarCode(barCode);

    if (barCode === '') {
      _setProductFound(undefined);
      return;
    }

    const filteredProduct = _products.find(product => product.barCode.toString() === barCode);
    _setProductFound(filteredProduct);
  }

  const _handleQuantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const quantity = e.target.value;
    _setProductQtt(quantity);

    if (!quantity) {
      _setProductTotalPrice('');
      return;
    }

    if (!_productFound?.price.$numberDecimal) {
      alert(`This product doesn't have a price registered`);
      return;
    }

    const totalPrice = parseFloat(_productFound.price.$numberDecimal) * parseInt(quantity);
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
    _getProducts();
    _productBarCodeRef.current?.focus();
  }, []);

  useEffect(() => {
    if (_productFound) {
      const _price = _productFound.price.$numberDecimal ? _productFound.price.$numberDecimal : '';
      _setProductTotalPrice(_price);
      _setProductBarCode(_productFound.barCode.toString());
    }
  }, [_productFound]);

  return (
    <Box>
      <AdvancedSearch
        openModal={_openAdvencedSearch}
        setOpenModal={_setOpenAdvencedSearch}
        setProductFound={_setProductFound}
      />
      <TextField
        type='text'
        sx={{ width: 480, marginBottom: 2 }}
        value={_productBarCode}
        label='Enter a product bar code'
        placeholder='Search'
        inputRef={_productBarCodeRef}
        onChange={_handleSearchBarCode}
        onKeyDown={_goToProductQtt}
      />
      <Tooltip title='Need help to find a product?'>
        <IconButton
          type='submit'
          aria-label='search'
          onClick={() => _setOpenAdvencedSearch(true)}
          size='medium'
        >
          <HelpOutlineRounded sx={{ fill: 'blue', margin: 1 }} />
        </IconButton>
      </Tooltip>
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