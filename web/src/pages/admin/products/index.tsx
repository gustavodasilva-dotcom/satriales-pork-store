import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IProduct } from 'interfaces/IProduct';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Edit, DeleteForever } from '@mui/icons-material';

const ProductsAdmin = () => {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get<IProduct[]>('v2/products', {
          signal: controller.signal
        });
        console.log(response.data);
        isMounted && setProducts(response.data);
      } catch (error) {
        console.error(error);
        //navigate('/admin/login', { state: { from: location }, replace: true });
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

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
                <b>Description</b>
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
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  {product?.name}
                </TableCell>
                <TableCell>
                  {product?.description}
                </TableCell>
                <TableCell>
                  $ {product?.price.toFixed(2).toString()}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/products/${product.uuid}`}>
                    <Edit color='primary' />
                  </Link>
                  <DeleteForever color='error' />
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