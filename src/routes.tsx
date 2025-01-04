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

interface ProtectedRouteProps {
  element: JSX.Element;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ element, isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

const PublicRoute = ({
  element,
  isAuthenticated,
}: {
  element: JSX.Element;
  isAuthenticated: boolean;
}) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export const RoutesComponent = () => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route
          path="/apresentation"
          element={
            <PublicRoute
              element={<Apresentation />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute
              element={<SignIn />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute
              element={<Register />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Rotas Protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/newbudget"
          element={
            <ProtectedRoute
              element={<Budget />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/listbudget"
          element={
            <ProtectedRoute
              element={<ListBudget />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/productsservices"
          element={
            <ProtectedRoute
              element={<ProductsAndServices />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/add-product-service"
          element={
            <ProtectedRoute
              element={<NewProductService />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/edit-product-service/:id"
          element={
            <ProtectedRoute
              element={<EditProductAndService />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute
              element={<Clients />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/see-clients"
          element={
            <ProtectedRoute
              element={<SeeAllClients />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/edit-client/:id"
          element={
            <ProtectedRoute
              element={<EditClients />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/configurations"
          element={
            <ProtectedRoute
              element={<Configurations />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};
