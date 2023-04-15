import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import PaymentType from './components/PaymentType/PaymentType';
import ProductsList from './components/ProductsList/ProductsList';
import AdminModal from 'components/admin/AdminModal';
import { ICheckout } from 'interfaces/ICheckout';
import { ReactComponent as SvgSuccessfulPurchase } from 'assets/svgs/undrawSuccessfulPurchase.svg';

const CheckoutPayment: FC = () => {
  const [_checkout, _setCheckout] = useState<ICheckout>();
  const [_selectedPaymentType, _setSelectedPaymentType] = useState('');
  const [_checkoutCompleted, _setCheckoutCompleted] = useState(false);

  const [_openModal, _setOpenModal] = useState(false);
  const [_modalTitle, _setModalTitle] = useState('');
  const [_modalMsg, _setModalMsg] = useState('');

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();
  const _ssnRef = useRef<HTMLInputElement>(null);

  const _loadCheckout = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getCheckout = async () => {
      try {
        const response = await _axiosPrivate.get<ICheckout>(`v2/checkouts/${id}`, {
          signal: controller.signal
        });
        isMounted && _setCheckout(response.data);
      } catch (error) {
        console.error(error);
        _navigate('/admin/login', { state: { from: _location }, replace: true });
      }
    };

    getCheckout();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(_loadCheckout, []);

  const _onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    _axiosPrivate.post('v2/checkouts/save-payment', {
      "checkout": id,
      "paymentType": _selectedPaymentType
    })
      .then(() => {
        _setCheckoutCompleted(true);
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
    <div>
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
      {_checkoutCompleted ? (
        <SvgSuccessfulPurchase />
      ) : (
        <Box
          component='form'
          onSubmit={_onSave}
          sx={{ width: '100%', display: 'flex' }}
        >
          <Box sx={{ width: '40%' }}>
            <PaymentType
              checkout={_checkout}
              selectedPaymentType={_selectedPaymentType}
              setSelectedPaymentType={_setSelectedPaymentType}
            />
            <div>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
              >
                Finish checkout
              </Button>
            </div>
          </Box>
          <Box sx={{ width: '90%' }}>
            <ProductsList checkout={_checkout} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CheckoutPayment;