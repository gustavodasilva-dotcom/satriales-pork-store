import { FC, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

import axios from 'api/axios';

import { IAddress } from 'interfaces/IAddress';
import { IAddressProps } from './AddressForm.types';
import { plainModal } from 'utils/Modals';

const AddressForm: FC<IAddressProps> = ({
  streetId,
  setStreetId,
  zipCode,
  setZipCode,
  number,
  setNumber,
  complement,
  setComplement,
  brazilianAddress,
  setBrazilianAddress
}) => {
  const [_name, _setName] = useState('');
  const [_neighborhood, _setNeighborhood] = useState('');
  const [_city, _setCity] = useState('');
  const [_state, _setState] = useState('');
  const [_country, _setCountry] = useState('');

  const _cleanFiels = (cleanZipCode: boolean = false) => {
    if (cleanZipCode) {
      setZipCode('');
    }

    setStreetId('');
    _setName('');
    setNumber('');
    setComplement('');
    _setNeighborhood('');
    _setCity('');
    _setState('');
    _setCountry('');
  };

  const _getAddressByZipCode = () => {
    if (zipCode.length !== 8) {
      _cleanFiels();
      return;
    }

    axios.get<IAddress>(`v1/addresses/zipcode/${zipCode}`)
      .then(res => {
        const data = res.data;

        setBrazilianAddress(data.isBrazilianAddress);
        setStreetId(data._id);
        setZipCode(data.zipCode);
        _setName(data.name);
        _setNeighborhood(data.neighborhood.name);
        _setCity(data.city.name);
        _setState(data.state.initials);
        _setCountry(data.country.name);
      })
      .catch(error => {
        let message: string;

        if (error?.response?.status === 404) {
          message = 'Address not found';
        } else {
          message = 'Error while contacting the server';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  const _handleBrazilianAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrazilianAddress(e.target.checked);
    _cleanFiels(true);
  };

  useEffect(() => {
    brazilianAddress && _getAddressByZipCode();
  }, [zipCode]);

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={brazilianAddress}
              onChange={_handleBrazilianAddress}
            />
          }
          label='Brazilian address'
        />
      </FormGroup>
      <input
        type='hidden'
        value={streetId}
      />
      <Box>
        <TextField
          label='Zip code'
          placeholder='Zip code'
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          variant='outlined'
          fullWidth
          required
          margin='dense'
        />
        <TextField
          label='Name'
          placeholder='Name'
          value={_name}
          onChange={e => _setName(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='Number'
          placeholder='Number'
          value={number}
          onChange={e => setNumber(e.target.value)}
          variant='outlined'
          fullWidth
          required
          margin='dense'
        />
        <TextField
          label='Complement'
          placeholder='Complement'
          value={complement}
          onChange={e => setComplement(e.target.value)}
          variant='outlined'
          fullWidth
          margin='dense'
        />
        <TextField
          label='Neighborhood'
          placeholder='Neighborhood'
          value={_neighborhood}
          onChange={e => _setNeighborhood(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='City'
          placeholder='City'
          value={_city}
          onChange={e => _setCity(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='State'
          placeholder='State'
          value={_state}
          onChange={e => _setState(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='Country'
          placeholder='Country'
          value={_country}
          onChange={e => _setCountry(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
      </Box>
    </Box>
  );
};

export default AddressForm;