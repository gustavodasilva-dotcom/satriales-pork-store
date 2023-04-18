import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'

import satrialesLogo from 'assets/logo.png';
import './Toolbar.style.scss';

const Toolbar: FC = () => {
  return (
    <div className='Toolbar'>
      <nav className='nav-container'>
        <div className='col-left'>
          <div className='logo-container'>
            <Link to='/'>
              <img src={satrialesLogo} alt="Logo" />
            </Link>
          </div>
          <ul className='menu-list'>
            <li className='menu-item'>
              <Link
                to='/home'
                className='menu-link'
              >
                Home
              </Link>
            </li>
            <li className='menu-item'>
              <Link
                to='/products'
                className='menu-link'
              >
                Products
              </Link>
            </li>
            <li className='menu-item'>
              <Link
                to='/about-us'
                className='menu-link'
              >
                About us
              </Link>
            </li>
            <li className='menu-item-admin'>
              <Link
                to='/admin/login'
                className='menu-admin'
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-right'>
          <FaUserCircle />
        </div>
      </nav>
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default Toolbar;