import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { IProduct } from 'interfaces/IProduct';

const URL = 'v2/products';

const ProductsFormAdmin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getProduct = () => {
    axiosPrivate.get<IProduct>(`${URL}/${id}`)
      .then(res => {
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price.toString());
      })
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
        name,
        description,
        price
      }
    })
      .then(() => navigate('/admin/products'))
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
        <TextField
          label='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          variant='standard'
          fullWidth
          required
          margin='dense'
        />
        <TextField
          label='Price'
          value={price}
          onChange={e => setPrice(e.target.value)}
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