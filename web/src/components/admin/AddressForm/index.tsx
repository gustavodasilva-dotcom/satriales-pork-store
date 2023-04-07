import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import axios from 'api/axios';
import { IAddress } from 'interfaces/IAddress';
import { FC, useState } from 'react';
import { IAddressProps } from './types';

const AddressForm: FC<IAddressProps> = ({
  streetId,
  setStreetId,
  number,
  setNumber,
  complement,
  setComplement
}) => {
  const [zipCode, setZipCode] = useState('');
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [brazilianAddress, setBrazilianAddress] = useState(false);

  const cleanFields = (cleanZipCode: boolean) => {
    if (cleanZipCode) {
      setZipCode('');
    }
    
    setName('');
    setNeighborhood('');
    setCity('');
    setState('');
    setCountry('');
    setNumber('');
    setComplement('');
  };

  const handleCheckBrazilianAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setBrazilianAddress(checked);
    cleanFields(true);
  };

  const handleZipCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const zipCode = e.target.value;
    setZipCode(zipCode);

    if (brazilianAddress) {
      getAddressByZipCode(zipCode);
    }
  };

  const getAddressByZipCode = (zipCode: string) => {
    cleanFields(false);

    if (zipCode.length === 8) {
      axios.get<IAddress>(`v1/address/zipcode/${zipCode}`)
        .then(res => {
          const data = res.data;

          setStreetId(data._id);
          setZipCode(data.zipCode);
          setName(data.name);
          setNeighborhood(data.neighborhood.name);
          setCity(data.city.name);
          setState(data.state.initials);
          setCountry(data.country.name);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={brazilianAddress}
              onChange={handleCheckBrazilianAddress}
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
          onChange={handleZipCode}
          variant='outlined'
          fullWidth
          required
          margin='dense'
        />
        <TextField
          label='Name'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
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
          value={neighborhood}
          onChange={e => setNeighborhood(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='City'
          placeholder='City'
          value={city}
          onChange={e => setCity(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='State'
          placeholder='State'
          value={state}
          onChange={e => setState(e.target.value)}
          variant='outlined'
          fullWidth
          required
          disabled={brazilianAddress}
          margin='dense'
        />
        <TextField
          label='Country'
          placeholder='Country'
          value={country}
          onChange={e => setCountry(e.target.value)}
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