import { FC, useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IProduct } from 'interfaces/IProduct';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Edit, DeleteForever } from '@mui/icons-material';

const URL = 'v2/products';

const ProductsAdmin: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get<IProduct[]>(URL, {
          signal: controller.signal
        });
        isMounted && setProducts(response.data);
      } catch (error) {
        console.error(error);
        navigate('/admin/login', { state: { from: location }, replace: true });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteProduct = (id: string) => {
    axiosPrivate.delete(`${URL}/${id}`)
      .then(() => {
        const otherProducts = products.filter(product => product._id !== id);
        setProducts([...otherProducts]);
      })
      .catch(error => {
        console.error(error);
        navigate('/admin/login', { state: { from: location }, replace: true });
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
            {products && products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  {product?.name}
                </TableCell>
                <TableCell>
                  $ {product?.price.$numberDecimal.toString()}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/products/${product._id}`}>
                    <Edit color='primary' />
                  </Link>
                  <DeleteForever
                    color='error'
                    onClick={() => deleteProduct(product._id)}
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

export default ProductsAdmin;