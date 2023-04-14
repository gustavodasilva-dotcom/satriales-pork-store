import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { IProductCategory } from 'interfaces/IProductCategory';

const URL = 'v2/productsCategories';

const ProductsFormAdmin: FC = () => {
  const [name, setName] = useState('');

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getProduct = () => {
    axiosPrivate.get<IProductCategory>(`${URL}/${id}`)
      .then(res => {
        setName(res.data.name);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = URL;
    let method = 'POST';

    if (id) {
      method = 'PUT';
      url += `/${id}`;
    }

    axiosPrivate.request({
      url,
      method,
      data: {
        name
      }
    })
      .then(() => navigate('/admin/products/categories'))
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    id && getProduct();
  }, []);

  return (
    <Box sx={styles.boxContainer}>
      <Box
        component='form'
        sx={styles.boxForm}
        onSubmit={onSave}
      >
        <TextField
          label='Name'
          value={name}
          onChange={e => setName(e.target.value)}
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