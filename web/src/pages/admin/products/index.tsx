import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IProduct } from 'interfaces/IProduct';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsAdmin = () => {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axiosPrivate.get<IProduct[]>('v2/products')
      .then(res => {
        setProducts(res.data);
        console.log(products);
      })
      .catch(() => console.log('Error'));
  }, []);

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
                Name
              </TableCell>
              <TableCell>
                Description
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  {product?.name}
                </TableCell>
                <TableCell>
                  <Link
                    to={'/admin/restaurantes'}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant='outlined' color='primary'>
                      Editar
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsAdmin;