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
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMsg, setModalMsg] = useState('');

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const ssnRef = useRef<HTMLInputElement>(null);

  const { id } = useParams();

  const goToPayments = () => {
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

    axiosPrivate.post<ICheckout>('v2/checkout/save-products', data)
      .then(res => {
        const data = res.data;
        navigate(`/admin/checkout/payment/${data._id}`);
      })
      .catch(error => {
        setOpenModal(true);
        setModalTitle('Ops!');

        if (error.response.status === 400) {
          setModalMsg('Wrong data sent to the server. Please, contact the administrator');
        } else {
          setModalMsg('Error while contacting the server');
        }
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminModal
        open={openModal}
        title={modalTitle}
        focusAfter={ssnRef}
        setOpen={setOpenModal} children={
          <Typography sx={{ mt: 2 }}>
            {modalMsg}
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
        goToPayments={goToPayments}
      />
    </Box>
  );
};

export default CheckoutProducts;