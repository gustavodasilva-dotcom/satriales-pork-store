import { Box, Button, TextField } from '@mui/material';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import AddressForm from 'components/admin/AddressForm';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { INaturalPerson } from 'interfaces/INaturalPerson';

const URL = 'v2/person/natural';

const ClientsFormAdmin = () => {
  const [name, setName] = useState('');
  const [ssn, setSsn] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [brazilianAddress, setBrazilianAddress] = useState(false);

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const getProduct = () => {
    axiosPrivate.get<INaturalPerson>(`${URL}/${id}`)
      .then(res => {
        const data = res.data;

        setName(data.name);
        setSsn(data.ssn);
        setZipCode(data.street.zipCode);
        setStreet(data.street._id);
        setNumber(data.number);
        setComplement(data.complement);
        setBrazilianAddress(data.street.isBrazilianAddress);
      })
      .catch(err => {
        console.error(err);
      });
  };

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

  useEffect(() => {
    id && getProduct();
  }, []);

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
            zipCode={zipCode}
            setZipCode={setZipCode}
            number={number}
            setNumber={setNumber}
            complement={complement}
            setComplement={setComplement}
            brazilianAddress={brazilianAddress}
            setBrazilianAddress={setBrazilianAddress}
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