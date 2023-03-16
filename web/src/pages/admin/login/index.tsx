import {
  Box,
  Button,
  Container,
  Paper,
  TextField
} from '@mui/material';
import { styles } from './styles';
import axios from 'api/axios';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginAdmin = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/home";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post('v1/auth', {
      email,
      password
    }, {
      headers: { 'Context-Type': 'application/json' },
      withCredentials: true
    })
      .then(res => {
        const accessToken = res?.data?.accessToken;
        setAuth(accessToken);
        navigate(from, { replace: true });
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={styles.textField}
              variant='standard'
              fullWidth
              required
            />
            <TextField
              type='password'
              label='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
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