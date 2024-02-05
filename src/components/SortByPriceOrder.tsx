import { FormControl, MenuItem, TextField } from '@mui/material';
interface SortByPriceOrderProps {
  priceSort: 'Low' | 'High';
  handleSort: () => void;
}

const SortByPriceOrder: React.FC<SortByPriceOrderProps> = ({
  priceSort,
  handleSort,
}) => {
  return (
    <>
      <FormControl>
        <TextField
          label='Price Order'
          id='category'
          name='category'
          value={priceSort}
          onChange={handleSort}
          select
          fullWidth
        >
          <MenuItem value='Low'>Low to High</MenuItem>
          <MenuItem value='High'>High to Low</MenuItem>
        </TextField>
      </FormControl>
    </>
  );
};

export default SortByPriceOrder;
