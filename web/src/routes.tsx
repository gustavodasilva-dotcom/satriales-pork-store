import React from 'react';
import AdminLogin from 'pages/admin/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/admin/login' element={<AdminLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;