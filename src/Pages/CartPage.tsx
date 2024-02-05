import { Grid, Typography, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import CartProduct from '../components/CartProduct';
import { emptyCart, cartSlice } from '../services/reducers/cartSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import CartItem from '../types/CartItem';
import cartReducer from '../services/reducers/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const carts: CartItem[] = useAppSelector((state) => state.cartReducer);

  const totalPrice =
    carts.length > 0
      ? carts.reduce((total, cart) => total + cart.price * cart.quantity, 0)
      : 0;

  const totalItems =
    carts.length > 0
      ? carts.reduce((total, cart) => total + cart.quantity, 0)
      : 0;

  const handleCleanCartItem = () => {
    dispatch(emptyCart());
  };

  return (
    <div>
      {carts.length === 0 ? (
        <Typography
          variant='h5'
          style={{
            paddingTop: '50%',
          }}
        >
          No items in the cart
        </Typography>
      ) : (
        <div>
          <Typography variant='h5' sx={{ marginLeft: '20%', padding: 1 }}>
            Total Items: {totalItems}
          </Typography>
          <Typography variant='h6' sx={{ marginLeft: '20%', padding: 1 }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
          <Grid container spacing={2} maxWidth='100%' justifyContent='center'>
            {carts.map((cart) => (
              <Grid item key={cart._id}>
                <CartProduct cart={cart} />
              </Grid>
            ))}
          </Grid>
          <Button
            variant='contained'
            color='error'
            onClick={handleCleanCartItem}
            sx={{ marginLeft: '20%', marginTop: '1rem', padding: 1 }}
          >
            Remove All
          </Button>
        </div>
      )}
      <Button sx={{ marginLeft: '20%' }} onClick={() => navigate('/')}>
        Back to Homepage
      </Button>
    </div>
  );
};

export default CartPage;
