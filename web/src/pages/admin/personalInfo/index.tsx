import { Box, Button, TextField } from '@mui/material';
import { IUser } from 'interfaces/IUser';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const URL = 'v2/personalInfo';

const PersonalInfo = () => {
  const [name, setName] = useState<string | undefined>('');
  const [email, setEmail] = useState('');

  const axiosPrivate = useAxiosPrivate();

  const getPersonalInfo = () => {
    axiosPrivate.get<IUser>(URL)
      .then(res => {
        setName(res.data?.name);
        setEmail(res.data.email);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosPrivate.put(URL, {
      name,
      email
    })
      .then(() => {
        alert('Ok');
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(getPersonalInfo, []);

  return (
    <Box>
      <Box
        component='form'
        onSubmit={onSave}
      >
        <TextField
          label='Name'
          value={name}
          onChange={e => setName(e.target.value)}
          variant='standard'
          fullWidth
          margin='dense'
        />
        <TextField
          type='email'
          label='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
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