import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { base_url } from '../../common/common';
import { getToken } from '../../common/getToken';
import Product from '../../types/Product';
import CreateProductInput from '../../types/Product';
import UpdateProductInput from '../../types/Product';
import Category from '../../types/Category';

const productURL = `${base_url}/products`; // http://localhost:8080/products
const categoryUrl = `${base_url}/categories`; // http://localhost:8080/categories

const initialState: {
  products: Product[];
  product?: Product;
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
  error: '',
};

export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const productsResponse = await axios.get<Product[]>(productURL);
      const productsWithCategory = await Promise.all(
        productsResponse.data.map(async (product) => {
          const categoryId = product.categoryId;
          const categoryResponse = await axios.get<Category>(
            `${categoryUrl}/${categoryId}`
          );
          return {
            ...product,
            categoryName: categoryResponse.data.name,
          };
        })
      );
      return productsWithCategory;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'fetchSingleProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const productResponse = await axios.get<Product>(`${productURL}/${id}`);
      const categoryId = productResponse.data.categoryId;
      const categoryResponse = await axios.get<Category>(
        `${categoryUrl}/${categoryId}`
      );
      const productWithCategory = {
        ...productResponse.data,
        categoryId: categoryResponse.data,
      };
      return productWithCategory;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  'createNewProduct',
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.post<Product>(
        productURL,
        newProduct,
        getToken()
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ update, _id }: UpdateProductInput, { rejectWithValue }) => {
    try {
      const result = await axios.put<Product>(`${productURL}/${_id}`, update);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (_id: string, { rejectWithValue }) => {
    try {
      const result = await axios.delete<string>(
        `${productURL}/${_id}`,
        getToken()
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchFromCategory = createAsyncThunk(
//   'fetchFromCategory',
//   async (_id: string) => {
//     try {
//       const result = await axios.get<Product[]>(
//         `${base_url}/products/?categoryId=${categoryId}`
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       return error;
//     }
//   }
// );

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    // addProduct: (state, action: PayloadAction<Product>) => {
    //   state.products.push(action.payload);
    // },
    // removeProduct: (state, action: PayloadAction<string>) => {
    //   const foundIndex = state.products.findIndex(
    //     (product) => product._id === action.payload
    //   );
    //   state.products.splice(foundIndex, 1);
    // },
    // removeAllProducts: (state) => {
    //   state = initialState;
    // },
    sortByPrice: (state, action: PayloadAction<'Low' | 'High'>) => {
      if (action.payload === 'High') {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
    // sortByCategory: (state, action: PayloadAction<'Low' | 'High'>) => {
    //   if (action.payload === 'High') {
    //     state.products.sort((a, b) => a.category.id - b.category.id);
    //   } else {
    //     state.products.sort((a, b) => b.categoryId.id - a.category.id);
    //   }
    // },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // .addCase(fetchFromCategory.fulfilled, (state, action) => {
    //   if (action.payload instanceof AxiosError) {
    //     state.error = action.payload.message;
    //   } else {
    //     state.products = action.payload;
    //   }
    //   state.loading = false;
    // })
    // .addCase(fetchFromCategory.pending, (state, action) => {
    //   state.loading = true;
    // })
    // .addCase(fetchFromCategory.rejected, (state, action) => {
    //   state.error = "Couldn't fetch data";
    // });
  },
});

const productReducer = productSlice.reducer;
export const { sortByPrice, reset } = productSlice.actions;
export default productReducer;
