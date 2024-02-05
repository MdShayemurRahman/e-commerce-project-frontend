export default interface Pagination {
  totalProducts: number;
  ProductsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  setProductsPerPage: (ProductsPerPage: number) => void;
}
