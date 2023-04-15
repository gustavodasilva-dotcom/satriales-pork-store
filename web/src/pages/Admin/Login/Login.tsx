import { FC, useState } from 'react';
import { Box, Button, Container, Paper, TextField } from '@mui/material';
import { styles } from './styles';
import axios from 'api/axios';
import useAuth from 'hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginAdmin: FC = () => {
  const { setAuth } = useAuth();
  const [_email, _setEmail] = useState('');
  const [_password, _setPassword] = useState('');
  const _navigate = useNavigate();
  const _location = useLocation();
  const _from = _location.state?.from?.pathname || "/admin/home";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post('v1/auth', {
      "email": _email,
      "password": _password
    }, {
      headers: { 'Context-Type': 'application/json' },
      withCredentials: true
    })
      .then(res => {
        const accessToken = res?.data?.accessToken;
        setAuth(accessToken);
        _navigate(_from, { replace: true });
      })
      .catch(err => {
        if (!err?.response) {
          alert('No response from the server');
        } else if (err.response?.status === 400) {
          alert('Email and password are required');
        } else if (err.response?.status === 401) {
          alert('Unauthorized');
        } else if (err.response?.status === 404) {
          alert('User not found');
        } else {
          alert('The login process failed');
        }
      });
  };

  return (
    <Container sx={styles.container}>
      <Box sx={styles.defaultBox}>
        <Paper sx={styles.paper}>
          <Box component='form' onSubmit={submit} sx={styles.boxForm}>
            <TextField
              label='Email'
              value={_email}
              onChange={e => _setEmail(e.target.value)}
              sx={styles.textField}
              variant='standard'
              fullWidth
              required
            />
            <TextField
              type='password'
              label='Password'
              value={_password}
              onChange={e => _setPassword(e.target.value)}
              sx={styles.textField}
              variant='standard'
              fullWidth
              required
            />
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={styles.button}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginAdmin;