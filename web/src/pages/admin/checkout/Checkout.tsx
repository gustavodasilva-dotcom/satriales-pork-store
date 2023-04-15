import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import AdminModal from 'components/admin/AdminModal';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { INaturalPerson } from 'interfaces/INaturalPerson';
import { ICheckout } from 'interfaces/ICheckout';

const Checkout: FC = () => {
  const [_clientSsn, _setClientSsn] = useState('');
  const [_clientSearched, _setClientSearched] = useState<INaturalPerson>();
  const [_openModal, _setOpenModal] = useState(false);
  const [_modalTitle, _setModalTitle] = useState('');
  const [_modalMsg, _setModalMsg] = useState('');
  const [_useClient, _setUseClient] = useState(false);
  const [_disableContinueButton, _setDisableContinueButton] = useState(true);

  const _ssnRef = useRef<HTMLInputElement>(null);

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();

  const _handleUseClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setUseClient(e.target.checked);
    _setClientSsn('');
    _setClientSearched(undefined);
  };

  const _handleKeySearchEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      _handleClientSearch();
    }
  };

  const _handleInputSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    _setClientSsn(e.target.value);
    _setClientSearched(undefined);
  };

  const _handleDisableContinueButton = () => {
    if (_useClient || _clientSearched) {
      _setDisableContinueButton(false);
    } else {
      _setDisableContinueButton(true);
      _setClientSearched(undefined);
    }
  };

  const _handleClientSearch = () => {
    if (_clientSsn) {
      _axiosPrivate.get<INaturalPerson>(`v2/persons/natural/${_clientSsn}`)
        .then(res => {
          const data = res.data;
          _setClientSearched(data);
        })
        .catch(error => {
          _setOpenModal(true);
          _setModalTitle('Ops!');

          if (error.response.status === 404) {
            _setModalMsg('Client not found');
          } else {
            _setModalMsg('Error while contacting the server');
          }
        });
    }
  };

  const _handleCheckoutClient = () => {
    const data = {
      "useClient": !_useClient,
      "client": _clientSearched?._id
    };

    _axiosPrivate.post<ICheckout>('v2/checkouts/save-client', data)
      .then(res => {
        const data = res.data;
        _navigate(`products/${data._id}`);
      })
      .catch(error => {
        _setOpenModal(true);
        _setModalTitle('Ops!');

        if (error.response.status === 400) {
          _setModalMsg('Wrong data sent to the server. Please, contact your administrator');
        } else {
          _setModalMsg('Error while contacting the server');
        }
      });
  };

  useEffect(() => {
    _ssnRef.current?.focus();
  }, []);

  useEffect(() => {
    _handleDisableContinueButton();
  }, [_useClient, _clientSearched]);

  return (
    <Box>
      <AdminModal
        open={_openModal}
        title={_modalTitle}
        focusAfter={_ssnRef}
        setOpen={_setOpenModal} children={
          <Typography sx={{ mt: 2 }}>
            {_modalMsg}
          </Typography>
        }
      />
      <TextField
        type='number'
        sx={{ width: 500 }}
        value={_clientSsn}
        label={`Enter the client's SSN`}
        placeholder={`Client's SSN`}
        inputRef={_ssnRef}
        onChange={_handleInputSearch}
        onKeyDown={_handleKeySearchEvent}
        disabled={_useClient}
      />
      <IconButton
        aria-label='search'
        onClick={_handleClientSearch}
        size='large'
        disabled={_useClient}
      >
        <Search />
      </IconButton>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={_useClient}
              onChange={_handleUseClient}
            />
          }
          label='Continue without informed client'
        />
      </FormGroup>
      {_clientSearched && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <TextField
            label='Name'
            placeholder='Name'
            value={_clientSearched.name}
            variant='outlined'
            fullWidth
            disabled
            margin='dense'
          />
          <TextField
            label='SSN'
            placeholder='SSN'
            value={_clientSearched.ssn}
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
        onClick={_handleCheckoutClient}
        disabled={_disableContinueButton}
        fullWidth
      >
        Continue to select products
      </Button>
    </Box>
  );
};

export default Checkout;