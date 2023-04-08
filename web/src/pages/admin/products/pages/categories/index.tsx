import { DeleteForever, Edit } from '@mui/icons-material';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IProductCategory } from 'interfaces/IProductCategory';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const URL = 'v2/productsCategories';

const Categories = () => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get<IProductCategory[]>(URL, {
          signal: controller.signal
        });
        isMounted && setCategories(response.data);
      } catch (error) {
        console.error(error);
        navigate('/admin/login', { state: { from: location }, replace: true });
      }
    };

    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  
  const deleteCategory = (id: string) => {
    axiosPrivate.delete(`${URL}/${id}`)
      .then(() => {
        const otherCategories = categories.filter(category => category._id !== id);
        setCategories([...otherCategories]);
      })
      .catch(error => {
        console.error(error);
        navigate('/admin/login', { state: { from: location }, replace: true });
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
            {categories && categories.map((category, index) => (
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
                    onClick={() => deleteCategory(category._id)}
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