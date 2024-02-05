import { FormControl, TextField } from '@mui/material';
import { useMemo } from 'react';

type SearchProps = {
  search: string | undefined;
  setSearch: (search: string) => void;
};

const ProductFilter = ({ search, setSearch }: SearchProps) => {
  const productFilter = useMemo(
    () => (
      <FormControl>
        <TextField
          label='Search product by title'
          variant='outlined'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormControl>
    ),
    [search, setSearch]
  );

  return productFilter;
};

export default ProductFilter;
