import { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, Menu, MenuItem } from '@mui/material';

import { IMenuItemProps } from './MenuPage.types';

const MenuPage: FC<IMenuItemProps> = ({ menuPage }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {menuPage.submenus.length === 0
        ? (
          <Link
            component={RouterLink}
            to={menuPage.menu.link!}
          >
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              sx={{ my: 2, color: 'white', margin: 2 }}
              onClick={handleClick}
            >
              {menuPage.menu.name}
            </Button>
          </Link>
        ) : (
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            sx={{ my: 2, color: 'white', margin: 2 }}
            onClick={handleClick}
          >
            {menuPage.menu.name}
          </Button>
        )}
      {menuPage.submenus.length > 0 &&
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {menuPage.submenus.map((submenu, index) => (
            <Link
              key={index}
              component={RouterLink}
              to={submenu.link!}
              sx={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem onClick={handleClose}>
                {submenu.name}
              </MenuItem>
            </Link>
          ))}
        </Menu>}
    </div>
  );
};

export default MenuPage;