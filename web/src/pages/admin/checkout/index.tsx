import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import AdminModal from 'components/admin/AdminModal';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { INaturalPerson } from 'interfaces/INaturalPerson';

const Checkout: FC = () => {
  const [clientSsn, setClientSsn] = useState('');
  const [clientSearched, setClientSearched] = useState<INaturalPerson>();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMsg, setModalMsg] = useState('');
  const [continueWithoutClient, setContinueWithoutClient] = useState(false);
  const [disableContinueButton, setDisableContinueButton] = useState(true);

  const ssnRef = useRef<HTMLInputElement>(null);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleContinueWithoutClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContinueWithoutClient(e.target.checked);
    setClientSsn('');
    setClientSearched(undefined);
  };

  const handleKeySearchEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleClientSearch();
    }
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClientSsn(e.target.value);
    setClientSearched(undefined);
  };

  const handleDisableContinueButton = () => {
    if (continueWithoutClient || clientSearched) {
      setDisableContinueButton(false);
    } else {
      setDisableContinueButton(true);
    }
  };

  const handleClientSearch = () => {
    axiosPrivate.get<INaturalPerson>(`v2/person/natural/${clientSsn}`)
      .then(res => {
        const data = res.data;
        setClientSearched(data);
      })
      .catch(error => {
        setOpenModal(true);
        setModalTitle('Ops!');

        if (error.response.status === 404) {
          setModalMsg('Client not found');
        } else {
          setModalMsg('Error while contacting the server');
        }
      });
  };

  useEffect(() => {
    ssnRef.current?.focus();
  }, []);

  useEffect(() => {
    handleDisableContinueButton();
  }, [continueWithoutClient, clientSearched]);

  return (
    <Box>
      <AdminModal
        open={openModal}
        title={modalTitle}
        focusAfter={ssnRef}
        setOpen={setOpenModal} children={
          <Typography sx={{ mt: 2 }}>
            {modalMsg}
          </Typography>
        }
      />
      <TextField
        type='number'
        sx={{ width: 500 }}
        value={clientSsn}
        label={`Enter the client's SSN`}
        placeholder={`Client's SSN`}
        inputRef={ssnRef}
        onChange={handleInputSearch}
        onKeyDown={handleKeySearchEvent}
        disabled={continueWithoutClient}
      />
      <IconButton
        aria-label='search'
        onClick={handleClientSearch}
        size='large'
        disabled={continueWithoutClient}
      >
        <Search />
      </IconButton>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={continueWithoutClient}
              onChange={handleContinueWithoutClient}
            />
          }
          label='Continue without informed client'
        />
      </FormGroup>
      {clientSearched && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            label='Name'
            placeholder='Name'
            value={clientSearched.name}
            variant='outlined'
            fullWidth
            disabled
            margin='dense'
          />
          <TextField
            label='SSN'
            placeholder='SSN'
            value={clientSearched.ssn}
            variant='outlined'
            fullWidth
            disabled
            margin='dense'
          />
        </Paper>
      )}
      <Button
        type='submit'
        variant='contained'
        onClick={() => navigate('products')}
        disabled={disableContinueButton}
        fullWidth
      >
        Continue to select products
      </Button>
    </Box>
  );
};

export default Checkout;