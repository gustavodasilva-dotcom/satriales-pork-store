import { FC, useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { INewMovementFormProps } from './NewMovementForm.types';
import { IStockMovementTypes } from 'interfaces/IStockMovementTypes';
import { plainModal } from 'utils/Modals';

const URL = 'v2/stocks'

const NewMovementForm: FC<INewMovementFormProps> = ({
  showForm,
  product
}) => {
  const [_productQuantity, _setProductQuantity] = useState<string>('');
  const [_stockMovementType, _setStockMovementType] = useState('');
  const [_stockMovementTypes, _setStockMovementTypes] = useState<IStockMovementTypes[]>([]);

  const _axiosPrivate = useAxiosPrivate();

  const _getStockMovementTypes = () => {
    _axiosPrivate.get<IStockMovementTypes[]>(`${URL}/movement-types`)
      .then(response => {
        const data = response.data;
        _setStockMovementTypes(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      product: product?._id,
      quantity: _productQuantity,
      stockMovementType: _stockMovementType
    };
    
    _axiosPrivate.post(`${URL}/movements`, data)
      .then(() => {
        plainModal({
          type: 'success',
          message: `Product's stock updated sucsessfully!`
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    _getStockMovementTypes();
  }, []);

  return (
    <Box sx={{ margin: '0 auto', minWidth: 500 }}>
      {showForm && (
        <Box
          component='form'
          onSubmit={onSave}
        >
          <Typography sx={{ mb: 2 }}>
            Bellow, inform a new quantity to the product:
          </Typography>
          <TextField
            type='number'
            label='Product quantity'
            value={_productQuantity}
            onChange={e => _setProductQuantity(e.target.value)}
            margin='dense'
            required
            fullWidth
          />
          <FormControl
            className='select-container'
            sx={{ mt: 2 }}
            required
            fullWidth
          >
            <InputLabel id='stock-movement-types-label'>
              Stock Movement Type
            </InputLabel>
            <Select
              labelId='stock-movement-types-label'
              id='stock-movement-types'
              value={_stockMovementType}
              label='Category'
              onChange={e => _setStockMovementType(e.target.value)}
            >
              {_stockMovementTypes.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item._id}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 2 }}
            fullWidth
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NewMovementForm;