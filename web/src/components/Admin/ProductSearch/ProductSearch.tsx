import { FC, useEffect, useRef, useState } from 'react';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { HelpOutlineRounded } from '@mui/icons-material';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

import AdvancedSearch from './components/AdvancedSearch';
import IProductSearchProps from './ProductSearch.types';
import { IProduct } from 'interfaces/IProduct';

const ProductSearch: FC<IProductSearchProps> = ({
  setProductFound,
  productBarCode,
  setProductBarCode,
  nextElement
}) => {
  const [_products, _setProducts] = useState<IProduct[]>([]);
  const [_openAdvencedSearch, _setOpenAdvencedSearch] = useState(false);

  const _productBarCodeRef = useRef<HTMLInputElement>(null);

  const _axiosPrivate = useAxiosPrivate();

  const _getProducts = () => {
    _axiosPrivate.get<IProduct[]>('v2/products')
      .then(response => {
        const data = response.data;
        _setProducts(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const _handleSearchBarCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const barCode = e.target.value;
    setProductBarCode(barCode);

    if (barCode === '') {
      setProductFound(undefined);
      return;
    }

    const filteredProduct = _products.find(product => product.barCode.toString() === barCode);
    setProductFound(filteredProduct);
  }

  useEffect(() => {
    _getProducts();
    _productBarCodeRef.current?.focus();
  }, []);

  return (
    <div>
      <AdvancedSearch
        openModal={_openAdvencedSearch}
        setOpenModal={_setOpenAdvencedSearch}
        setProductFound={setProductFound}
      />
      <TextField
        type='text'
        sx={{ width: 480, marginBottom: 2 }}
        value={productBarCode}
        label='Enter a product bar code'
        placeholder='Search'
        inputRef={_productBarCodeRef}
        onChange={_handleSearchBarCode}
        onKeyDown={nextElement}
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
    </div>
  );
};

export default ProductSearch;