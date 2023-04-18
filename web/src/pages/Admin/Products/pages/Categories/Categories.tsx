import { FC, useEffect, useState } from 'react';
import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IProductCategory } from 'interfaces/IProductCategory';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
      } catch (error) {
        console.error(error);
        _navigate('/admin/login', { state: { from: _location }, replace: true });
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
        console.error(error);
        _navigate('/admin/login', { state: { from: _location }, replace: true });
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
                  <Link to={`/admin/products/${category._id}`}>
                    <Edit color='primary' />
                  </Link>
                  <DeleteForever
                    color='error'
                    onClick={() => _deleteCategory(category._id)}
                  />
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