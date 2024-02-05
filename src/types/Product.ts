import Category from './Category';

export default interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryId: Category;
  categoryName: string;
  images: string[];
  stock?: number;
}

export default interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: Category;
  images: string[];
  stock?: number;
}

export default interface UpdateProductInput {
  update: {
    name: string;
    description: string;
    price: number;
    categoryId: Category;
    images: string[];
    stock?: number;
  };
  _id: string;
}
