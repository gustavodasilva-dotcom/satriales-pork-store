import { Box, Button, TextField } from '@mui/material';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import AddressForm from 'components/admin/AddressForm';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URL = 'v2/person/natural';

const ClientsFormAdmin = () => {
  const [name, setName] = useState('');
  const [ssn, setSsn] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = URL;
    let method = 'POST';

    if (id) {
      method = 'PUT';
      url += `/${id}`;
    }

    axiosPrivate.request({
      url,
      method,
      data: {
        name,
        ssn,
        number,
        complement,
        street
      }
    })
      .then(() => navigate('/admin/clients'))
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <Box sx={styles.boxContainer}>
        <Box
          component='form'
          sx={styles.boxForm}
          onSubmit={onSave}
        >
          <TextField
            label='Name'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
            variant='outlined'
            fullWidth
            required
            margin='dense'
          />
          <TextField
            label='SSN'
            placeholder='ssn'
            value={ssn}
            onChange={e => setSsn(e.target.value)}
            variant='outlined'
            fullWidth
            required
            margin='dense'
          />
          <AddressForm
            streetId={street}
            setStreetId={setStreet}
            number={number}
            setNumber={setNumber}
            complement={complement}
            setComplement={setComplement}
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