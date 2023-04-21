import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { plainModal } from 'utils/Modals';

import { IProductCategory } from 'interfaces/IProductCategory';
import { styles } from './styles';

const URL = 'v2/products-categories';

const ProductsFormAdmin: FC = () => {
  const [_name, _setName] = useState('');

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _getProduct = () => {
    _axiosPrivate.get<IProductCategory>(`${URL}/${id}`)
      .then(res => {
        _setName(res.data.name);
      })
      .catch(error => {
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else if (error?.response?.status === 404) {
          message = 'Category not found';
        } else {
          message = 'Failed to process category';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  const _onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = URL;
    let method = 'POST';

    if (id) {
      method = 'PUT';
      url += `/${id}`;
    }

    _axiosPrivate.request({
      url,
      method,
      data: {
        "name": _name
      }
    })
      .then(() => _navigate('/admin/products/categories'))
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    id && _getProduct();
  }, []);

  return (
    <Box sx={styles.boxContainer}>
      <Box
        component='form'
        sx={styles.boxForm}
        onSubmit={_onSave}
      >
        <TextField
          label='Name'
          value={_name}
          onChange={e => _setName(e.target.value)}
          variant='standard'
          fullWidth
          required
          margin='dense'
        />
        <Button
          type='submit'
          variant='contained'
          sx={styles.button}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsFormAdmin;