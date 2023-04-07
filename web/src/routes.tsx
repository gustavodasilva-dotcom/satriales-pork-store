import AdminLogin from 'pages/admin/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import RequireAuth from 'components/RequireAuth';
import PersistLogin from 'components/PersistLogin';
import Checkout from 'pages/admin/checkout';
import AdminHome from 'pages/admin/home';
import HeaderBarAdmin from 'components/admin/HeaderBar';
import PersonalInfoAdmin from 'pages/admin/personalInfo';
import ProductsAdmin from 'pages/admin/products';
import ProductsFormAdmin from 'pages/admin/products/form';
import ProductsCategoriesAdmin from 'pages/admin/products/categories';
import ProductsCategoriesFormAdmin from 'pages/admin/products/categories/form';
import ClientsAdmin from 'pages/admin/clients';
import ClientsFormAdmin from 'pages/admin/clients/form';

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

                <Route path='personal-info' element={<PersonalInfoAdmin />} />
                
                <Route path='checkout' element={<Checkout />} />

                <Route path='products' element={<ProductsAdmin />} />
                <Route path='products/new' element={<ProductsFormAdmin />} />
                <Route path='products/:id' element={<ProductsFormAdmin />} />

                <Route path='products/categories' element={<ProductsCategoriesAdmin />} />
                <Route path='products/categories/new' element={<ProductsCategoriesFormAdmin />} />
                <Route path='products/categories/:id' element={<ProductsCategoriesFormAdmin />} />

                <Route path='clients' element={<ClientsAdmin />} />
                <Route path='clients/new' element={<ClientsFormAdmin />} />
                <Route path='clients/:id' element={<ClientsFormAdmin />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;