import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { logInUserAsync } from '../services/reducers/authReducer';
import { LockOutlined } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({ email: '', password: '' });
  const { error } = useAppSelector((state) => state.authReducer);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogInData({ ...logInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(logInUserAsync(logInData));
    if (resultAction.meta.requestStatus === 'fulfilled') {
      toast.success('Logged in successfully');
      navigate('/');
    } else if (resultAction.meta.requestStatus === 'rejected') {
      error.length != 0
        ? toast.error(error)
        : toast.error('Error loggin in');
    }
  };

  return (
    <div>
      <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
        <LockOutlined />
      </Avatar>
      <Typography variant='h5' component='h2' gutterBottom>
        User Login
      </Typography>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type='email'
            name='email'
            label='Email'
            variant='outlined'
            value={logInData.email}
            onChange={onChangeHandler}
            required
            fullWidth
            margin='normal'
          />
        </div>
        <div>
          <TextField
            type='password'
            name='password'
            label='Password'
            variant='outlined'
            value={logInData.password}
            onChange={onChangeHandler}
            required
            fullWidth
            margin='normal'
          />
        </div>
        <Box mt={2}>
          <Button type='submit' variant='contained' color='primary'>
            Log in
          </Button>
        </Box>
        <Box mt={2}>
          Don't have an account yet?
          <Link
            to='/signup'
            style={{ textDecoration: 'underline', color: 'inherit' }}
          >
            Sign up
          </Link>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
