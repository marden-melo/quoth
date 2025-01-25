import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import { SignIn } from './pages/auth/SignIn';
import { Apresentation } from './pages/auth/Apresentation';
import { Register } from './pages/auth/Register';
import { Home } from './pages/app/Home';
import { Dashboard } from './pages/app/Dashboard';
import { Budget } from './pages/app/Budget';
import { ProductsAndServices } from './pages/app/ProductsAndServices';
import { ListBudget } from './pages/app/ListBudget';
import { Clients } from './pages/app/Clients';
import { Configurations } from './pages/app/Configurations';
import { NewProductService } from './pages/app/ProductsAndServices/NewProductService';
import { SeeAllClients } from './pages/app/Clients/SeeAllClients';
import { EditClients } from './pages/app/Clients/EditClients';
import { EditProductAndService } from './pages/app/ProductsAndServices/EditProductService';

import { useAuth } from './hooks/useAuth';

export const RoutesComponent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route
          path="/apresentation"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Apresentation />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Rotas Protegidas */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/newbudget"
          element={
            isAuthenticated ? <Budget /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/listbudget"
          element={
            isAuthenticated ? <ListBudget /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/productsservices"
          element={
            isAuthenticated ? (
              <ProductsAndServices />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/add-product-service"
          element={
            isAuthenticated ? (
              <NewProductService />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/edit-product-service/:id"
          element={
            isAuthenticated ? (
              <EditProductAndService />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/clients"
          element={
            isAuthenticated ? <Clients /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/see-clients"
          element={
            isAuthenticated ? (
              <SeeAllClients />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/edit-client/:id"
          element={
            isAuthenticated ? <EditClients /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/configurations"
          element={
            isAuthenticated ? (
              <Configurations />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};
