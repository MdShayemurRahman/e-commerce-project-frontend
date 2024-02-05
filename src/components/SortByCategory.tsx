import { useEffect } from 'react';
import { FormControl, MenuItem, TextField } from '@mui/material';

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchAllCategories } from '../services/reducers/categoryReducer';
interface SortByCategoryProps {
  setCategory: (categoryId: number) => void;
}

const SortByCategory: React.FC<SortByCategoryProps> = ({ setCategory }) => {
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return (
    <>
      <FormControl>
        <TextField
          label='Category'
          name='category'
          select
          fullWidth
          onChange={(e) =>
            setCategory(parseInt((e.target.value as string).toString()))
          }
        >
          <MenuItem value={100}>All</MenuItem>
          {/* {categories.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))} */}
        </TextField>
      </FormControl>
    </>
  );
};

export default SortByCategory;
