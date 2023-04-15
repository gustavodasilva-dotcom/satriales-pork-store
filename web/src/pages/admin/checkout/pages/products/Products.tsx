import { FC, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import SearchProduct from '../../components/SearchProduct';
import ProductList from '../../components/ProductsList';
import { IProductCheckout } from 'interfaces/IProductCheckout';
import { ICheckout } from 'interfaces/ICheckout';
import AdminModal from 'components/admin/AdminModal';

const CheckoutProducts: FC = () => {
  const [_productsToList, _setProductToList] = useState<IProductCheckout[]>([]);
  const [_purchaseTotalPrice, _setPurchaseTotalPrice] = useState('');
  const [_openModal, _setOpenModal] = useState(false);
  const [_modalTitle, _setModalTitle] = useState('');
  const [_modalMsg, _setModalMsg] = useState('');

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _ssnRef = useRef<HTMLInputElement>(null);

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
        _setOpenModal(true);
        _setModalTitle('Ops!');

        if (error.response.status === 400) {
          _setModalMsg('Wrong data sent to the server. Please, contact the administrator');
        } else {
          _setModalMsg('Error while contacting the server');
        }
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminModal
        open={_openModal}
        title={_modalTitle}
        focusAfter={_ssnRef}
        setOpen={_setOpenModal} children={
          <Typography sx={{ mt: 2 }}>
            {_modalMsg}
          </Typography>
        }
      />
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