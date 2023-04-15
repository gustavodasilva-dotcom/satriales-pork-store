import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { IProductCategory } from 'interfaces/IProductCategory';

const URL = 'v2/productsCategories';

const ProductsFormAdmin: FC = () => {
  const [_name, _setName] = useState('');

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();

  const _getProduct = () => {
    _axiosPrivate.get<IProductCategory>(`${URL}/${id}`)
      .then(res => {
        _setName(res.data.name);
      })
      .catch(err => {
        console.error(err);
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