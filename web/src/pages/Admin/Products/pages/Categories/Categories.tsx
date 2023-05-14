import { FC, useEffect, useState } from 'react';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { plainModal } from 'utils/Modals';

import { IProductCategory } from 'interfaces/IProductCategory';

const URL = 'v2/products-categories';

const Categories: FC = () => {
  const [_categories, _setCategories] = useState<IProductCategory[]>([]);

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _loadCategories = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await _axiosPrivate.get<IProductCategory[]>(URL, {
          signal: controller.signal
        });
        isMounted && _setCategories(response.data);
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
          message = 'Failed to get categories';
        }

        plainModal({
          type: 'error',
          message
        });
      }
    };

    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(_loadCategories, []);

  const _deleteCategory = (id: string) => {
    _axiosPrivate.delete(`${URL}/${id}`)
      .then(() => {
        const otherCategories = _categories.filter(category => category._id !== id);
        _setCategories([...otherCategories]);
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
          message = 'Failed to get categories';
        }

        plainModal({
          type: 'error',
          message
        });
      })
  };

  return (
    <>
      <Link to='/admin/products/categories/new' style={{ textDecoration: 'none' }}>
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
                <b>Options</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_categories && _categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>
                  {category?.name}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label='edit'
                    size='medium'
                  >
                    <Link to={`/admin/products/categories/${category._id}`}>
                      <Edit color='primary' />
                    </Link>
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    size='medium'
                  >
                    <DeleteForever
                    color='error'
                    onClick={() => _deleteCategory(category._id)}
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

export default Categories;