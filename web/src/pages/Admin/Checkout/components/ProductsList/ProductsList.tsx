import { FC, useEffect, useState } from 'react';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { DeleteForever, Edit } from '@mui/icons-material';
import calculateProductPrice from 'utils/CalculateProductPrice';
import { IProductListProps } from './types';

const ProductsList: FC<IProductListProps> = ({
  productsToCheckout,
  purchaseTotalPrice,
  setPurchaseTotalPrice,
  goToPayments
}) => {
  const [_ableGoToPayment, _setAbleGoToPayment] = useState(true);

  const _sumPurchaseTotalPrice = () => {
    const sumProductPrices = (accumulator: Number, a: Number): Number => {
      return accumulator.valueOf() + a.valueOf();
    };

    const calcProductPrices = productsToCheckout.map(item => {
      return calculateProductPrice(item.product, item.quantity);
    });

    const productPricesSum = calcProductPrices.reduce(sumProductPrices, 0);
    setPurchaseTotalPrice(productPricesSum.toFixed(2));
  };

  const _handleGoToPayment = () => _setAbleGoToPayment(!(productsToCheckout.length >= 1));

  useEffect(() => {
    _sumPurchaseTotalPrice();
    _handleGoToPayment();
  }, [productsToCheckout]);

  return (
    <Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label='Total price'
            value={purchaseTotalPrice}
            onChange={e => setPurchaseTotalPrice(e.target.value)}
            disabled
          />
          <Button
            type='button'
            variant='contained'
            size='medium'
            disabled={_ableGoToPayment}
            onClick={goToPayments}
          >
            Go to payment
          </Button>
        </Box>
      </Box>
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
                <b>Price (sum)</b>
              </TableCell>
              <TableCell>
                <b>Options</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsToCheckout && productsToCheckout.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {item.product?.barCode.toString()}
                </TableCell>
                <TableCell>
                  {item.product?.name}
                </TableCell>
                <TableCell>
                  $ {Number(item.product?.price.$numberDecimal).toFixed(2)}
                </TableCell>
                <TableCell>
                  {item.quantity.toString()}
                </TableCell>
                <TableCell>
                  $ {calculateProductPrice(item.product, item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Edit color='primary' />
                  </IconButton>
                  <IconButton>
                    <DeleteForever color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsList;