import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { plainModal } from 'utils/Modals';
import SearchProduct from '../../components/SearchProduct/SearchProduct';
import ProductList from '../../components/ProductsList';

import { IProductCheckout } from 'interfaces/IProductCheckout';
import { ICheckout } from 'interfaces/ICheckout';

const CheckoutProducts: FC = () => {
  const [_productsToList, _setProductToList] = useState<IProductCheckout[]>([]);
  const [_purchaseTotalPrice, _setPurchaseTotalPrice] = useState('');

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const { id } = useParams();

  const _goToPayments = () => {
    const products = _productsToList.map(product => {
      return {
        "product": product.product?._id,
        "quantity": product.quantity
      };
    });

    const data = {
      "checkout": id,
      "products": products,
      "totalPrice": _purchaseTotalPrice
    };

    _axiosPrivate.post<ICheckout>('v2/checkouts/save-products', data)
      .then(res => {
        const data = res.data;
        _navigate(`/admin/checkout/payment/${data._id}`);
      })
      .catch(error => {
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 400) {
          message = 'Wrong data sent to the server. Please, contact the administrator';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else {
          message = 'Error while contacting the server';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SearchProduct
        productsToList={_productsToList}
        setProductsToList={_setProductToList}
      />
      <ProductList
        productsToCheckout={_productsToList}
        purchaseTotalPrice={_purchaseTotalPrice}
        setPurchaseTotalPrice={_setPurchaseTotalPrice}
        goToPayments={_goToPayments}
      />
    </Box>
  );
};

export default CheckoutProducts;