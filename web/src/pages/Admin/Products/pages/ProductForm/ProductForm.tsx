import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { plainModal } from 'utils/Modals';
import UploadPictures from './components/UploadPictures/UploadPictures';
import CategoriesOptions from './components/CategoriesOptions/CategoriesOptions';

import { IProduct } from 'interfaces/IProduct';
import { IImage } from 'interfaces/IImage';
import './ProductForm.scss';

const URL = 'v2/products';

const ProductForm: FC = () => {
  const [_name, _setName] = useState('');
  const [_description, _setDescription] = useState('');
  const [_price, _setPrice] = useState('');
  const [_category, _setCategory] = useState('');
  const [_barCode, _setBarCode] = useState<Number>();
  const [_imageList, _setImageList] = useState<IImage[]>([]);
  const [_imagesDeleted, _setImagesDeleted] = useState<string[]>([]);
  const [_stock, _setStock] = useState<Number | undefined>();

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _getProduct = () => {
    _axiosPrivate.get<IProduct>(`${URL}/${id}`)
      .then(res => {
        console.log(res);
        _setName(res.data.name);
        _setDescription(res.data.description);
        _setPrice(res.data.price.$numberDecimal);
        _setCategory(res.data.category._id);
        _setBarCode(res.data.barCode);
        _setImageList(res.data.images);
        _setStock(res.data.stock);
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
          message = 'Failed to get product';
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

    const images = _imageList.map(image => {
      return { id: image._id };
    })

    console.log(_imageList);

    _axiosPrivate.request({
      url,
      method,
      data: {
        "name": _name,
        "description": _description,
        "price": _price,
        "category": _category,
        "barCode": _barCode,
        "images": {
          "uploads": images,
          "deletes": _imagesDeleted
        }
      }
    })
      .then(() => _navigate('/admin/products'))
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
    id && _getProduct();
  }, []);

  return (
    <Box className='ProductForm'>
      <Box
        component='form'
        className='form-wrapper'
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
        <CategoriesOptions
          category={_category}
          setCategory={_setCategory}
        />
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
        <TextField
          disabled
          label='Stock quantity'
          value={_stock}
          variant='standard'
          fullWidth
          margin='dense'
          defaultValue='0'
        />
        <UploadPictures
          imageList={_imageList}
          setImageList={_setImageList}
          imagesDeleted={_imagesDeleted}
          setImagesDeleted={_setImagesDeleted}
        />
        <Button
          type='submit'
          variant='contained'
          className='button-container'
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;