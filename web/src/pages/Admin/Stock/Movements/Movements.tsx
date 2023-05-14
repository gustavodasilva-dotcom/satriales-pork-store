import { FC, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import ProductSearch from 'components/Admin/ProductSearch';
import { formatDatePtBR } from 'utils/Formatters/Date';

import { IProduct } from 'interfaces/IProduct';
import { IStockMovement } from 'interfaces/IStockMovement';

const Movements: FC = () => {
  const [_productBarCode, _setProductBarCode] = useState('');
  const [_productFound, _setProductFound] = useState<IProduct | undefined>();
  const [_stockMovements, _setStockMovements] = useState<IStockMovement[]>([]);

  const _axiosPrivate = useAxiosPrivate();

  const _getProductStockMovements = () => {
    if (_productFound) {
      _axiosPrivate.get<IStockMovement[]>(`v2/stocks/movements/${_productFound?._id}`)
        .then(res => {
          const data = res.data;
          console.log(data.length);
          _setStockMovements(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    _getProductStockMovements();
    _setProductBarCode(_productFound?.barCode.toString() ?? '')
  }, [_productFound]);

  useEffect(() => {
    if (!_productBarCode) {
      _setStockMovements([]);
    }
  }, [_productBarCode]);

  return (
    <Box>
      <ProductSearch
        setProductFound={_setProductFound}
        productBarCode={_productBarCode}
        setProductBarCode={_setProductBarCode}
      />
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Product</b>
                </TableCell>
                <TableCell>
                  <b>Barcode</b>
                </TableCell>
                <TableCell>
                  <b>Movement type</b>
                </TableCell>
                <TableCell>
                  <b>Previous quantity</b>
                </TableCell>
                <TableCell>
                  <b>Current quantity</b>
                </TableCell>
                <TableCell>
                  <b>Date</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                _stockMovements.length > 0 && _stockMovements.map((movement, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {movement.product.name}
                    </TableCell>
                    <TableCell>
                      {movement.product.barCode.toString()}
                    </TableCell>
                    <TableCell>
                      {movement.stockMovementType.name}
                    </TableCell>
                    <TableCell>
                      {
                        movement.previousQuantity
                          ? movement.previousQuantity.toString()
                          : 'N/A'
                      }
                    </TableCell>
                    <TableCell>
                      {
                        movement.currentQuantity
                          ? movement.currentQuantity.toString()
                          : 'N/A'
                      }
                    </TableCell>
                    <TableCell>
                      {formatDatePtBR({
                        date: movement.date,
                        withHour: true
                      })}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Movements;