import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  fetchAllProducts,
  // fetchFromCategory,
  sortByPrice,
} from '../services/reducers/productSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getFilteredItem } from '../components/FilterItem';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import SortByCategory from '../components/SortByCategory';
import SortByPriceOrder from '../components/SortByPriceOrder';
import { fetchAllCategories } from '../services/reducers/categoryReducer';
import Pagination from '../components/Pagination';

const PaperContent = styled(Paper)(({ theme }) => ({
  padding: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem 0',
    marginTop: '3rem',
  },
  '& *': {
    fontSize: '14px',
    width: '12rem',
    marginBottom: '.3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      width: '8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      width: '95%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [search, setSearch] = useState<string | undefined>();
  const [category, setCategory] = useState(100);
  const [priceSort, setPriceSort] = useState<'Low' | 'High'>('Low');
  const [currentpage, setCurrentpage] = useState(1);
  const [ProductPerPage, setProductPerPage] = useState(4);
  const lastPostIndex = currentpage * ProductPerPage;
  const firstPostIndex = lastPostIndex - ProductPerPage;

  

  useEffect(() => {
    if (category === 100) {
      dispatch(fetchAllProducts());
      dispatch(fetchAllCategories());
      
      setPriceSort('Low');
    } else {
      // dispatch(fetchFromCategory({ categoryId: category.toString() }));
      setPriceSort('High');
    }
  }, [category, dispatch]);

  const filteredProducts = useAppSelector((state) =>
    getFilteredItem(state, typeof search === 'string' ? search : '')
  );

  const mainResultProduct = filteredProducts.slice(
    firstPostIndex,
    lastPostIndex
  );

  const handleSort = () => {
    dispatch(sortByPrice(priceSort));
    setPriceSort(priceSort === 'Low' ? 'High' : 'Low');
  };
  

  return (
    <Grid container>
      <Grid item xs={12} sm={2} margin={1}>
        <PaperContent>
          <ProductFilter search={search} setSearch={setSearch} />
          {/* <SortByCategory setCategory={setCategory} /> */}
          <SortByPriceOrder priceSort={priceSort} handleSort={handleSort} />
        </PaperContent>
      </Grid>
      <Grid item xs={12} sm={9} margin={1}>
        <ProductList products={mainResultProduct} />
      </Grid>
      <Pagination
        totalProducts={filteredProducts.length}
        ProductsPerPage={ProductPerPage}
        setCurrentPage={setCurrentpage}
        currentPage={currentpage}
        setProductsPerPage={setProductPerPage}
      />
    </Grid>
  );
};

export default HomePage;
