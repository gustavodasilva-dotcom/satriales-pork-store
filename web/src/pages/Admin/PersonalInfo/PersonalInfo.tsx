import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { plainModal } from 'utils/Modals';

import { IUser } from 'interfaces/IUser';
import { styles } from './styles';

const URL = 'v2/personal-infos';

const PersonalInfo: FC = () => {
  const [_name, _setName] = useState<string | undefined>('');
  const [_email, _setEmail] = useState('');

  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();
  const _location = useLocation();

  const _getPersonalInfo = () => {
    _axiosPrivate.get<IUser>(URL)
      .then(res => {
        _setName(res.data?.name);
        _setEmail(res.data.email);
      })
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
          message = 'User not found';
        } else {
          message = 'Failed to get personal info';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  const _onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    _axiosPrivate.put(URL, {
      "name": _name,
      "email": _email
    })
      .then(() => {
        alert('Ok');
      })
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
          message = 'User not found';
        } else {
          message = 'Failed to process user';
        }

        plainModal({
          type: 'error',
          message
        });
      });
  };

  useEffect(_getPersonalInfo, []);

  return (
    <Box>
      <Box
        component='form'
        onSubmit={_onSave}
      >
        <TextField
          label='Name'
          value={_name}
          onChange={e => _setName(e.target.value)}
          variant='standard'
          fullWidth
          margin='dense'
        />
        <TextField
          type='email'
          label='Email'
          value={_email}
          onChange={e => _setEmail(e.target.value)}
          variant='standard'
          fullWidth
          required
          margin='dense'
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
  );
};

export default PersonalInfo;