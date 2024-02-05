import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { decodeToken } from '../common/getToken';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carts = useAppSelector((state) => state.cartReducer);
  const { currentUser } = useAppSelector((state) => state.authReducer); // current user is the token
  const isLoggedIn = !!currentUser;
  console.log(isLoggedIn); // giving me true..

   const decodedUser = isLoggedIn
     ? decodeToken(currentUser?.toString() || '')
     : null;


  const logout = () => {
    const isLoggedIn = false;
    navigate('/');
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}
          >
            Express Store
          </Typography>

          {isLoggedIn ? (
            <div className='nav-items'>
              <Button
                variant='text'
                style={{ color: 'white' }}
                onClick={() => navigate('/profile')}
              >
                {decodedUser?.email}
              </Button>
              {location.pathname !== '/' && (
                <Button style={{ color: '#ff0' }} onClick={() => navigate('/')}>
                  Home
                </Button>
              )}
              <Button variant='contained' color='error' onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className='nav-items'>
              <Button color='inherit' onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color='inherit' onClick={() => navigate('/signup')}>
                SignUp
              </Button>
            </div>
          )}
          {location.pathname !== '/cart' && (
            <Button style={{ color: 'white' }}>
              <ShoppingCartIcon onClick={() => navigate('/cart')} />
              {carts.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    borderRadius: '50%',
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'red',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {carts.length}
                </span>
              )}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
