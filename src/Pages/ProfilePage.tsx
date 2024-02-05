import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { DecodedToken } from '../types/DeodedToken';
import { decodeToken } from '../common/getToken';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const [userData, setUserData] = useState<DecodedToken | undefined>(undefined);

  useEffect(() => {
    if (currentUser) {
      const tokenString = currentUser.toString();
      const decodedData = decodeToken(tokenString);
      setUserData(decodedData);
      console.log(decodedData?.email);
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Your Profile</h1>

      {userData ? (
        <div>
          <div>
            <h2>Name: {userData.name}</h2>
          </div>
          <div>
            <p>Email: {userData.email}</p>
          </div>
          <div>
            <p>Role: {userData.role}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
