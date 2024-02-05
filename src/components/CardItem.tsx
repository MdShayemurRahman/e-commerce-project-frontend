import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';

import Product from '../types/Product';
import { addProductToCart } from '../services/reducers/cartSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import categoryReducer from '../services/reducers/categoryReducer';
import Category from '../types/Category';

const CardItem: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProductToCart(product));
  };

  const carts = useAppSelector((state) => state.cartReducer);

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <CardMedia
          component='img'
          height={160}
          image={product.images[0]}
          alt={product.name}
        />
        <CardContent sx={{ width: '5rem' }}>
          <Typography gutterBottom variant='h5' component='h5'>
            {product.name}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {product.categoryName}
          </Typography>
          <Typography gutterBottom variant='h5' component='h5'>
            {product.categoryId?.name}
          </Typography>
          <p style={{ fontSize: 14 }}>${product.price}</p>
        </CardContent>

        <CardActions>
          <Button
            size='small'
            variant='contained'
            onClick={() => (window.location.pathname = `/${product._id}`)}
          >
            Details
          </Button>

          <IconButton
            onClick={handleAddToCart}
            color='primary'
            aria-label='add to shopping cart'
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default CardItem;
