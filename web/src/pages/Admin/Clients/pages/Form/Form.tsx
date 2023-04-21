import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import AddressForm from 'components/Admin/AddressForm';
import { plainModal } from 'utils/Modals';

import { INaturalPerson } from 'interfaces/INaturalPerson';
import { styles } from './styles';

const URL = 'v2/persons/natural';

const ClientsFormAdmin: FC = () => {
  const [_name, _setName] = useState('');
  const [_ssn, _setSsn] = useState('');
  const [_zipCode, _setZipCode] = useState('');
  const [_street, _setStreet] = useState('');
  const [_number, _setNumber] = useState('');
  const [_complement, _setComplement] = useState('');
  const [_brazilianAddress, _setBrazilianAddress] = useState(false);

  const { id } = useParams();

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _getProduct = () => {
    _axiosPrivate.get<INaturalPerson>(`${URL}/${id}`)
      .then(res => {
        const data = res.data;

        _setName(data.name);
        _setSsn(data.ssn);
        _setZipCode(data.street.zipCode);
        _setStreet(data.street._id);
        _setNumber(data.number);
        _setComplement(data.complement);
        _setBrazilianAddress(data.street.isBrazilianAddress);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const _onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = URL;
    let method = 'POST';

    if (id) {
      method = 'PUT';
      url += `/${id}`;
    }

    _axiosPrivate.request({
      url,
      method,
      data: {
        "name": _name,
        "ssn": _ssn,
        "number": _number,
        "complement": _complement,
        "street": _street
      }
    })
      .then(() => _navigate('/admin/clients'))
      .catch(error => {
        let message: string;

        if (!error?.response) {
          message = 'No response from the server';
        } else if (error?.response?.status === 401) {
          message = 'Unauthorized';
        } else if (error?.response?.status === 403) {
          _navigate('/admin/login', { state: { from: _location }, replace: true });
          return;
        } else if (error?.response?.status === 404) {
          message = 'Client not found';
        } else {
          message = 'Failed to process client';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  useEffect(() => {
    id && _getProduct();
  }, []);

  return (
    <>
      <Box sx={styles.boxContainer}>
        <Box
          component='form'
          sx={styles.boxForm}
          onSubmit={_onSave}
        >
          <TextField
            label='Name'
            placeholder='Name'
            value={_name}
            onChange={e => _setName(e.target.value)}
            variant='outlined'
            fullWidth
            required
            margin='dense'
          />
          <TextField
            label='SSN'
            placeholder='ssn'
            value={_ssn}
            onChange={e => _setSsn(e.target.value)}
            variant='outlined'
            fullWidth
            required
            margin='dense'
          />
          <AddressForm
            streetId={_street}
            setStreetId={_setStreet}
            zipCode={_zipCode}
            setZipCode={_setZipCode}
            number={_number}
            setNumber={_setNumber}
            complement={_complement}
            setComplement={_setComplement}
            brazilianAddress={_brazilianAddress}
            setBrazilianAddress={_setBrazilianAddress}
          />
          <Button
            type='submit'
            variant='contained'
            sx={styles.button}
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ClientsFormAdmin;