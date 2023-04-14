import { FC, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { IProduct } from 'interfaces/IProduct';
import { IProductCategory } from 'interfaces/IProductCategory';

const URL = 'v2/products';

const ProductsFormAdmin: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [barCode, setBarCode] = useState<Number>();
  const [categories, setCategories] = useState<IProductCategory[]>([]);

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getProduct = () => {
    axiosPrivate.get<IProduct>(`${URL}/${id}`)
      .then(res => {
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price.$numberDecimal);
        setCategory(res.data.category._id);
        setBarCode(res.data.barCode);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getCategories = () => {
    axiosPrivate.get<IProduct[]>('v2/productsCategories')
      .then(res => {
        setCategories(res.data);
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
        name,
        description,
        price,
        category,
        barCode
      }
    })
      .then(() => navigate('/admin/products'))
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCategories();
    
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
        <FormControl fullWidth>
          <InputLabel
            id='products-categories-label'
            sx={styles.select}
          >
            Category
          </InputLabel>
          <Select
            labelId='products-categories-label'
            id='products-categories'
            value={category}
            label='Category'
            onChange={e => setCategory(e.target.value)}
            sx={styles.select}
          >
            {categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item._id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type='number'
          label='Bar code'
          value={barCode || ''}
          onChange={e => setBarCode(Number(e.target.value))}
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