import {
  Box,
  Button,
  Container,
  Paper,
  TextField
} from '@mui/material';
import { styles } from './styles';
import axios from 'api/axios';
import { useState, useContext } from 'react';
import AuthContext from 'context/AuthProvider';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);

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
        const accessToken = res.data.accessToken;
        setAuth(accessToken);
      })
      .catch(err => console.log(err));
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

export default AdminLogin;