import Product from '../types/Product';
import { AppState } from '../services/store';

export const getFilteredItem = (state: AppState, search?: string) => {
  return state.productReducer.products.filter((p: Product) =>
    p.name.toLowerCase().includes(search?.toLowerCase() || '')
  );
};
