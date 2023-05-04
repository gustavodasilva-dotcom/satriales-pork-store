import { FC, useState } from 'react';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Container, IconButton, Link, Menu, MenuItem, Paper, Toolbar, Typography } from '@mui/material';

import useAuth from 'hooks/useAuth';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { plainModal } from 'utils/Modals';
import MenuPage from './components/MenuPage';

import { menuPages } from './HeaderBar.data';
import { styles } from './styles';

const HeaderBarAdmin: FC = () => {
  const { setAuth } = useAuth();
  const [_anchorEl, _setAnchorEl] = useState<null | HTMLElement>(null);
  const _axiosPrivate = useAxiosPrivate();
  const _navigate = useNavigate();

  const _handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    _setAnchorEl(e.currentTarget);
  };

  const _handleClose = () => {
    _setAnchorEl(null);
  };

  const _handleLogOut = () => {
    _axiosPrivate.get('v1/logout')
      .then(() => {
        setAuth('');
        _navigate('/admin/login');
      })
      .catch(() => {
        const message = 'Error while contacting the server';

        plainModal({
          type: 'error',
          message
        });
      });
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
              {menuPages.map((menu, index) => (
                <MenuPage
                  key={index}
                  menuPage={menu}
                />
              ))}
            </Box>
            <div>
              <IconButton
                size='large'
                aria-label='conta do usuário atual'
                aria-controls='menu-account-appbar'
                aria-haspopup='true'
                onClick={_handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-account-appbar"
                anchorEl={_anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(_anchorEl)}
                onClose={_handleClose}
              >
                <Link
                  component={RouterLink}
                  to='personal-info'
                  sx={styles.dfMenuItem}
                >
                  <MenuItem onClick={_handleClose}>
                    Personal info
                  </MenuItem>
                </Link>
                <Link
                  component={RouterLink}
                  to='settings'
                  sx={styles.dfMenuItem}
                >
                  <MenuItem onClick={_handleClose}>
                    Settings
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={_handleLogOut}
                  sx={styles.lgMenuItem}
                >
                  Log out
                </MenuItem>
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