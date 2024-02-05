import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  CssBaseline,
  Checkbox,
  TextField,
  FormControlLabel,
  Avatar,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createUserAsync } from '../services/reducers/userReducer';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.userReducer);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(createUserAsync(formData));

    if (response.meta.requestStatus === 'fulfilled') {
      toast.success('Account successfully created');
      navigate('/login');
    } else if (response.meta.requestStatus === 'rejected') {
      toast.error(error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <Box mt={2}>
          <Button type='submit' variant='contained' color='primary'>
            Sign up
          </Button>
        </Box>
        <Box mt={2}>
          Already have an account?
          <Link
            to='/login'
            style={{ textDecoration: 'underline', color: 'inherit' }}
          >
            Sign in
          </Link>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
