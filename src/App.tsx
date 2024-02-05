import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import CartPage from './Pages/CartPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import PageNotFound from './Pages/PageNotFound';
import ProductPage from './Pages/ProductPage';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <main
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5%',
            marginBottom: '2%',
          }}
        >
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='/:id' element={<ProductPage />} /> 
              <Route path='/cart' element={<CartPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<RegisterPage />} />
              <Route path='/logout' element={<HomePage />} />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path='/create'
                element={
                  <ProtectedRoute>
                    <CreateProduct />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path='/update/:id'
                element={
                  <ProtectedRoute>
                    <UpdateProduct />
                  </ProtectedRoute>
                }
              /> */}
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
