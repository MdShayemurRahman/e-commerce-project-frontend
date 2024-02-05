import { Button, CardMedia, Card } from '@mui/material';
import { CardContent, Typography, Grid } from '@mui/material';

import CartItem from '../types/CartItem';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  removeProductFromCart,
  updateCartItemQuantity,
} from '../services/reducers/cartSlice';

const CartProduct: React.FC<{ cart: CartItem }> = ({ cart }) => {
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = () => {
    cart.quantity > 1
      ? dispatch(
          updateCartItemQuantity({ _id: cart._id, quantity: cart.quantity - 1 })
        )
      : dispatch(removeProductFromCart({ id: cart._id }));
  };
  const handleIncreaseQuantity = () => {
    dispatch(
      updateCartItemQuantity({ _id: cart._id, quantity: cart.quantity + 1 })
    );
  };

  const handleRemoveCartItem = () => {
    dispatch(removeProductFromCart({ id: cart._id }));
  };

  return (
    <Card sx={{ width: 700 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <CardMedia
            height='200'
            width='200'
            component='img'
            image={cart.images[0]}
            alt={cart.name}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <CardContent>
            <Typography variant='h5' component='h3'>
              {cart.name}
            </Typography>
            <Typography variant='body1' component='p'>
              {cart.price} $
            </Typography>

            <div className='cart-action'>
              <Button
                onClick={handleDecreaseQuantity}
                variant='contained'
                color='error'
              >
                -
              </Button>

              <Typography variant='body1' component='p'>
                {cart.quantity}
              </Typography>
              <Button
                onClick={handleIncreaseQuantity}
                variant='contained'
                color='primary'
              >
                +
              </Button>
            </div>

            <Button onClick={handleRemoveCartItem} color='error'>
              Remove
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartProduct;
