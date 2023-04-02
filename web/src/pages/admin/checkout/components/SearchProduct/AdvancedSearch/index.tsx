import { FC, useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Modal, TextField } from '@mui/material';
import { IProduct } from 'interfaces/IProduct';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
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
        _setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const _handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchedValue = e.target.value;

    if (searchedValue) {
      const filteredProducts = _products.filter(product => product.name.toLowerCase().includes(searchedValue));
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
                >
                  <ListItemText primary={item.name} onClick={() => _handleProductFound(item._id)} />
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