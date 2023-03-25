import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Paper, Toolbar, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useState } from 'react';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';

const HeaderBarAdmin = () => {
  const { setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    axiosPrivate.get('v1/logout')
      .then(() => {
        setAuth('');
        navigate('/admin/login');
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar>
            <Link component={RouterLink} to='/admin/home'>
              <Typography variant='h6' sx={{ color: 'white', marginRight: 5 }}>
                Satriale's
              </Typography>
            </Link>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to='/admin/products'>
                <Button sx={{ my: 2, color: 'white', margin: 2 }}>
                  Products
                </Button>
              </Link>
            </Box>
            <div>
              <IconButton
                size='large'
                aria-label='conta do usuário atual'
                aria-controls='menu-account-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-account-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Personal info</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogOut}>Sair</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth='lg' sx={{ marginTop: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default HeaderBarAdmin;