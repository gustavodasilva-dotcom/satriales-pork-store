import AdminLogin from 'pages/admin/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import RequireAuth from 'components/RequireAuth';
import PersistLogin from 'components/PersistLogin';
import AdminHome from 'pages/admin/home';
import HeaderBarAdmin from 'components/admin/HeaderBar';
import ProductsAdmin from 'pages/admin/products';
import ProductsFormAdmin from 'pages/admin/products/form';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/admin/login' element={<AdminLogin />} />

          <Route element={<PersistLogin />}>
            <Route path='/admin' element={<HeaderBarAdmin />}>
              <Route element={<RequireAuth />}>
                <Route path='home' element={<AdminHome />} />
                <Route path='products' element={<ProductsAdmin />} />
                <Route path='products/new' element={<ProductsFormAdmin />} />
                <Route path='products/:id' element={<ProductsFormAdmin />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;