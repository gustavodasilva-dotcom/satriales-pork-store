import { FC } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculateProductPrice from 'utils/CalculateProductPrice';
import { IProductsListProps } from './types';

const ProductsList: FC<IProductsListProps> = ({ checkout }) => {
  const _productsData = checkout?.products;

  return (
    <div>
      <TableContainer sx={{ width: 550, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Bar code</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Price (un)</b>
              </TableCell>
              <TableCell>
                <b>Quantity</b>
              </TableCell>
              <TableCell>
                <b>Total</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_productsData && _productsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.product?.barCode.toString()}
                </TableCell>
                <TableCell>
                  {item.product?.name}
                </TableCell>
                <TableCell>
                  {`$ ${Number(item.product?.price.$numberDecimal).toFixed(2)}`}
                </TableCell>
                <TableCell>
                  {item.quantity.toString()}
                </TableCell>
                <TableCell>
                  {`$ ${CalculateProductPrice(item.product, item.quantity).toFixed(2)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductsList;