import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useState, useEffect, FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IPaymentTypes } from "interfaces/IPaymentTypes";
import { IPaymentTypeProps } from "./types";

const PaymentType: FC<IPaymentTypeProps> = ({ checkout }) => {
  const _checkoutData = checkout;

  const [_paymentTypes, _setPaymentTypes] = useState<IPaymentTypes[]>([]);
  const [_selectedPaymentType, _setSelectedPaymentType] = useState('');

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _loadData = () => {
    let isMounted = true;
    const controller = new AbortController();

    const getPaymentTypes = async () => {
      try {
        const response = await _axiosPrivate.get<IPaymentTypes[]>('v2/payments/types', {
          signal: controller.signal
        });
        isMounted && _setPaymentTypes(response.data);
      } catch (error) {
        console.error(error);
        _navigate('/admin/login', { state: { from: _location }, replace: true });
      }
    };

    getPaymentTypes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(_loadData, []);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id='payment-types-label'
        >
          Payment types
        </InputLabel>
        <Select
          labelId='payment-types-label'
          id='payment-types'
          value={_selectedPaymentType}
          label='Select a payment type'
          onChange={e => _setSelectedPaymentType(e.target.value)}
          required
        >
          {_paymentTypes.map((item, index) => (
            <MenuItem
              key={index}
              value={item._id}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        value={_checkoutData?.totalPrice.toFixed(2)}
        sx={{ mt: 2 }}
        disabled
      />
    </div>
  );
};

export default PaymentType;