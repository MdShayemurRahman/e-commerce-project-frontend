import { Grid } from '@mui/material';

import CardItem from './CardItem';
import Product from '../types/Product';

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product: Product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <CardItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
