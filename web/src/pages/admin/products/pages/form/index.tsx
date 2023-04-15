import { FC, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { IProduct } from 'interfaces/IProduct';
import { IProductCategory } from 'interfaces/IProductCategory';

const URL = 'v2/products';

const ProductsFormAdmin: FC = () => {
  const [_name, _setName] = useState('');
  const [_description, _setDescription] = useState('');
  const [_price, _setPrice] = useState('');
  const [_category, _setCategory] = useState('');
  const [_barCode, _setBarCode] = useState<Number>();
  const [_categories, _setCategories] = useState<IProductCategory[]>([]);

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();

  const _getProduct = () => {
    _axiosPrivate.get<IProduct>(`${URL}/${id}`)
      .then(res => {
        _setName(res.data.name);
        _setDescription(res.data.description);
        _setPrice(res.data.price.$numberDecimal);
        _setCategory(res.data.category._id);
        _setBarCode(res.data.barCode);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const _getCategories = () => {
    _axiosPrivate.get<IProduct[]>('v2/productsCategories')
      .then(res => {
        _setCategories(res.data);
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
        "name": _name,
        "description": _description,
        "price": _price,
        "category": _category,
        "barCode": _barCode
      }
    })
      .then(() => _navigate('/admin/products'))
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    _getCategories();
    
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
        <TextField
          label='Description'
          value={_description}
          onChange={e => _setDescription(e.target.value)}
          variant='standard'
          fullWidth
          required
          margin='dense'
        />
        <TextField
          label='Price'
          value={_price}
          onChange={e => _setPrice(e.target.value)}
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
            value={_category}
            label='Category'
            onChange={e => _setCategory(e.target.value)}
            sx={styles.select}
          >
            {_categories.map((item, index) => (
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
          value={_barCode || ''}
          onChange={e => _setBarCode(Number(e.target.value))}
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