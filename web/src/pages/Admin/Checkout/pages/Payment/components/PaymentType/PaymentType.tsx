import { useState, useEffect, FC } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "hooks/useAxiosPrivate";

import { IPaymentTypes } from "interfaces/IPaymentTypes";
import { IPaymentTypeProps } from "./types";
import { plainModal } from "utils/Modals";

const PaymentType: FC<IPaymentTypeProps> = ({
  checkout,
  selectedPaymentType,
  setSelectedPaymentType
}) => {
  const _checkoutData = checkout;

  const [_paymentTypes, _setPaymentTypes] = useState<IPaymentTypes[]>([]);

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
      } catch (error: any) {
        console.error(error);
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
          value={selectedPaymentType}
          label='Select a payment type'
          onChange={e => setSelectedPaymentType(e.target.value)}
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
        value={'$ ' + _checkoutData?.totalPrice.toFixed(2) ?? ''}
        label='Total price'
        sx={{ mt: 2 }}
        disabled
      />
    </div>
  );
};

export default PaymentType;