import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { addProductToCart } from '../services/reducers/cartSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Product from '../types/Product';
import {
  deleteProduct,
  fetchSingleProduct,
  updateProduct,
} from '../services/reducers/productSlice';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cartReducer from '../services/reducers/cartSlice';
import CartItem from '../types/CartItem';
import { toast } from 'react-toastify';
import UpdateProductInput from '../types/Product';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { users } = useAppSelector((state) => state.userReducer);
  const [choice, setChoice] = useState<number>(0);

  const singleProduct = useAppSelector<Product>(
    (state) => state.productReducer.product
  );
  const error = useAppSelector<string>((state) => state.productReducer.error);

  useEffect(() => {
    id && dispatch(fetchSingleProduct(id));
  }, [id]);

  const handleIncChange = () => {
    if (choice < singleProduct.images.length - 1) {
      setChoice(choice + 1);
    } else {
      setChoice(0);
    }
  };

  const handleDecChange = () => {
    if (choice === 0) {
      setChoice(singleProduct.images.length - 1);
    } else {
      setChoice(choice - 1);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddToCart = (payload: Product) => {
    dispatch(addProductToCart(payload));
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await dispatch(deleteProduct(productId));
      navigate('/');
    } catch (error) {
      const e = error as Error;
      toast.error(e.message);
    }
  };

  return (
    <Container sx={{ marginTop: 8 }}>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={6} textAlign='center'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {singleProduct?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={singleProduct?.name}
                style={{
                  maxWidth: '80%',
                  height: 'auto',
                  display: index === choice ? 'block' : 'none',
                }}
              />
            ))}
            {singleProduct?.images.length > 1 && (
              <div>
                <ArrowBackIosIcon onClick={handleDecChange} />
                <ArrowForwardIosIcon onClick={handleIncChange} />
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h4' component='p'>
            {singleProduct?.name}
          </Typography>
          <Typography variant='body1' component='p'>
            Category:{' '}
            {singleProduct?.categoryId
              ? singleProduct.categoryId.name
              : 'Loading...'}
          </Typography>
          <Typography variant='body2' component='p'>
            Price: {singleProduct?.price} $
          </Typography>
          <Typography variant='body2' component='p'>
            Description: {singleProduct?.description}
          </Typography>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <Button
              onClick={() => singleProduct && onAddToCart(singleProduct)}
              variant='contained'
              color='primary'
              style={{ margin: '5px' }}
              startIcon={<AddShoppingCartIcon />}
            >
              Add To Cart
            </Button>

            {/* {user?.role === 'admin' ? ( */}
            <div style={{ margin: '5px' }}>
              <Button>
                <Link to={`/update/${id}`}>Update</Link>
              </Button>
              <Button
                onClick={handleOpen}
                variant='outlined'
                color='error'
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='parent-modal-title'
                aria-describedby='parent-modal-description'
              >
                <Paper sx={modalStyle}>
                  <Typography variant='h6' component='h2'>
                    Delete Alert
                  </Typography>
                  <Typography component='p'>
                    Are you sure you want to delete this product?
                  </Typography>
                  <Button
                    onClick={() => handleDeleteProduct(singleProduct?._id)}
                    variant='contained'
                    color='error'
                    style={{ margin: '1rem' }}
                  >
                    Delete
                  </Button>
                  <Button onClick={handleClose} variant='contained'>
                    Cancel
                  </Button>
                </Paper>
              </Modal>
            </div>
            {/* ) : null} */}
            <Button
              onClick={() => navigate('/')}
              variant='outlined'
              color='primary'
            >
              Back to Homepage
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
