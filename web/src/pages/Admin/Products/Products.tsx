import { FC, useEffect, useState } from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { plainModal } from 'utils/Modals';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { IProduct } from 'interfaces/IProduct';

const URL = 'v2/products';

const ProductsAdmin: FC = () => {
  const [_products, _setProducts] = useState<IProduct[]>([]);

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _loadProducts = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await _axiosPrivate.get<IProduct[]>(URL, {
          signal: controller.signal
        });
        isMounted && _setProducts(response.data);
      } catch (error: any) {
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else {
          message = 'Failed to get products';
        }

        plainModal({
          type: 'error',
          message
        });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(_loadProducts, []);

  const deleteProduct = (id: string) => {
    _axiosPrivate.delete(`${URL}/${id}`)
      .then(() => {
        const otherProducts = _products.filter(product => product._id !== id);
        _setProducts([...otherProducts]);
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
          message = 'Failed to get products';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  return (
    <>
      <Link to='/admin/products/new' style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='primary'>
          Novo
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Price</b>
              </TableCell>
              <TableCell>
                <b>Options</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_products && _products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  {product?.name}
                </TableCell>
                <TableCell>
                  $ {product?.price.$numberDecimal.toString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label='edit'
                    size='medium'
                  >
                    <Link to={`/admin/products/${product._id}`}>
                      <Edit color='primary' />
                    </Link>
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    size='medium'
                  >
                    <DeleteForever
                      color='error'
                      onClick={() => deleteProduct(product._id)}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsAdmin;