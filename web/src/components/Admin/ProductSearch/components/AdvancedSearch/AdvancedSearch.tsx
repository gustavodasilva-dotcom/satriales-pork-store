import { FC, useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Modal, TextField } from '@mui/material';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { IProduct } from 'interfaces/IProduct';
import IAdvancedSearchProps from './types';
import { styles } from './styles';

const AdvancedSearch: FC<IAdvancedSearchProps> = ({
  openModal,
  setOpenModal,
  setProductFound
}) => {
  const [_products, _setProducts] = useState<IProduct[]>([]);
  const [_productsFiltered, _setProductsFiltered] = useState<IProduct[]>([]);

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

  const _handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchedValue = e.target.value;

    if (searchedValue) {
      const filteredProducts = _products.filter(product => product.name.toLowerCase().includes(searchedValue.toLowerCase()));
      _setProductsFiltered(filteredProducts);
    } else {
      _setProductsFiltered([]);
    }
  };

  const _handleProductFound = (id: string) => {
    const productFound = _products.find(product => product._id === id);
    setOpenModal(false);
    setProductFound(productFound);
    _setProductsFiltered([]);
  };

  useEffect(() => {
    _getProducts();
  }, []);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box sx={styles.boxWrapper}>
          <Box sx={{ width: '100%' }}>
            <TextField
              className='text'
              sx={{ width: '100%' }}
              label='Enter a product name'
              variant='outlined'
              placeholder='Search...'
              size='small'
              onChange={_handleSearch}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <List sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}>
              {_productsFiltered.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => _handleProductFound(item._id)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AdvancedSearch;