import { FC, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { plainModal } from 'utils/Modals';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { IProductCategory } from 'interfaces/IProductCategory';
import { ICategoriesOptionsProps } from './CategoriesOptions.types';

const CategoriesOptions: FC<ICategoriesOptionsProps> = ({
  category,
  setCategory
}) => {
  const [_categories, _setCategories] = useState<IProductCategory[]>([]);

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _getCategories = () => {
    _axiosPrivate.get<IProductCategory[]>('v2/products-categories')
      .then(res => {
        _setCategories(res.data);
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
          message = 'Product not found';
        } else {
          message = 'Failed to process product';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  useEffect(() => {
    _getCategories();
  }, []);

  return (
    <FormControl
      fullWidth
      className='select-container'
    >
      <InputLabel id='products-categories-label'>
        Category
      </InputLabel>
      <Select
        labelId='products-categories-label'
        id='products-categories'
        value={category}
        label='Category'
        onChange={e => setCategory(e.target.value)}
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
  );
};

export default CategoriesOptions;