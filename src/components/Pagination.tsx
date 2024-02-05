import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import PaginationInterface from '../types/Pagination';

const Pagination = ({
  totalProducts,
  ProductsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationInterface) => {
  let pages: number[] = [];
  const totalPages = Math.ceil(totalProducts / ProductsPerPage);
  for (let i = 1; i <= Math.ceil(totalProducts / ProductsPerPage); i++) {
    pages.push(i);
  }
  const decrement = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const increment = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={decrement} disabled={currentPage === 1}>
          <ArrowBackIosIcon />
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>{currentPage}</p>-
          <p>{Math.ceil(totalProducts / ProductsPerPage)}</p>
        </div>
        <Button onClick={increment} disabled={currentPage === totalPages}>
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </>
  );
};

export default Pagination;
