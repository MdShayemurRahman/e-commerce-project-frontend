import { Navigate } from 'react-router-dom';

import {useAppSelector} from '../hooks/useAppSelector';

interface Props {
  children: any;
}

const ProtectedRoute = ({ children }: Props) => {
  const { users } = useAppSelector(
    (state) => state.userReducer
  );
  if (!users) {
    return <Navigate to='/' />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
