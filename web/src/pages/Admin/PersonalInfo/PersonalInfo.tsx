import { FC, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { IUser } from 'interfaces/IUser';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const URL = 'v2/personal-infos';

const PersonalInfo: FC = () => {
  const [_name, _setName] = useState<string | undefined>('');
  const [_email, _setEmail] = useState('');

  const _axiosPrivate = useAxiosPrivate();

  const _getPersonalInfo = () => {
    _axiosPrivate.get<IUser>(URL)
      .then(res => {
        _setName(res.data?.name);
        _setEmail(res.data.email);
      })
      .catch(err => {
        console.error(err);
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
      .catch(err => {
        console.error(err);
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