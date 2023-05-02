import AdminLogin from 'pages/Admin/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/Auth';
import RequireAuth from 'components/RequireAuth';
import PersistLogin from 'components/PersistLogin';
import Toolbar from 'components/Toolbar';
import Home from 'pages/Home';
import Products from 'pages/Products';
import ProductDetails from 'pages/Products/pages/ProductDetails/ProductDetails';
import AboutUs from 'pages/AboutUs';
import Checkout from 'pages/Admin/Checkout';
import CheckoutProducts from 'pages/Admin/Checkout/pages/Products';
import CheckoutPayment from 'pages/Admin/Checkout/pages/Payment';
import AdminHome from 'pages/Admin/Home';
import HeaderBarAdmin from 'components/Admin/HeaderBar';
import PersonalInfoAdmin from 'pages/Admin/PersonalInfo';
import ProductsAdmin from 'pages/Admin/Products';
import ProductsFormAdmin from 'pages/Admin/Products/pages/ProductForm';
import ProductsCategoriesAdmin from 'pages/Admin/Products/pages/Categories';
import ProductsCategoriesFormAdmin from 'pages/Admin/Products/pages/Categories/Form';
import ClientsAdmin from 'pages/Admin/Clients';
import ClientsFormAdmin from 'pages/Admin/Clients/pages/Form';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Toolbar />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/details/:id' element={<ProductDetails />} />
          </Route>

          <Route path='/admin/login' element={<AdminLogin />} />

          <Route element={<PersistLogin />}>
            <Route path='/admin' element={<HeaderBarAdmin />}>
              <Route element={<RequireAuth />}>
                <Route path='home' element={<AdminHome />} />

                <Route path='personal-info' element={<PersonalInfoAdmin />} />

                <Route path='checkout' element={<Checkout />} />
                <Route path='checkout/products/:id' element={<CheckoutProducts />} />
                <Route path='checkout/payment/:id' element={<CheckoutPayment />} />

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