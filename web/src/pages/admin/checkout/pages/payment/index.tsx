import { FC, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import PaymentType from './components/PaymentType/PaymentType';
import { ICheckout } from 'interfaces/ICheckout';
import ProductsList from './components/ProductsList/ProductsList';

const CheckoutPayment: FC = () => {
  const [_checkout, _setCheckout] = useState<ICheckout>();

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

  };

  return (
    <div>
      <Box
        component='form'
        onSubmit={_onSave}
        sx={{ width: '100%' }}
      >
        <Box sx={{ width: '50%' }}>
          <PaymentType checkout={_checkout} />
          <div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
            >
              Finalizar checkout
            </Button>
          </div>
        </Box>
      </Box>
      <Box sx={{ width: '50%' }}>
        <ProductsList checkout={_checkout} />
      </Box>
    </div>
  );
};

export default CheckoutPayment;