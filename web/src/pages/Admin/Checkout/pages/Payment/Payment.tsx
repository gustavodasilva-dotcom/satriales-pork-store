import { FC, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import PaymentType from './components/PaymentType/PaymentType';
import ProductsList from './components/ProductsList/ProductsList';
import { plainModal } from 'utils/Modals';

import { ICheckout } from 'interfaces/ICheckout';
import { ReactComponent as SvgSuccessfulPurchase } from 'assets/svgs/undrawSuccessfulPurchase.svg';

const CheckoutPayment: FC = () => {
  const [_checkout, _setCheckout] = useState<ICheckout>();
  const [_selectedPaymentType, _setSelectedPaymentType] = useState('');
  const [_checkoutCompleted, _setCheckoutCompleted] = useState(false);

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _loadCheckout = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getCheckout = async () => {
      try {
        const response = await _axiosPrivate.get<ICheckout>(`v2/checkouts/${id}`, {
          signal: controller.signal
        });
        isMounted && _setCheckout(response.data);
      } catch (error: any) {
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else {
          message = 'Failed to get checkout';
        }

        plainModal({
          type: 'error',
          message
        });
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
    <div>
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