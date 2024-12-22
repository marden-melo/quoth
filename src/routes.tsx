import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { SignIn } from './pages/auth/SignIn';
import { Home } from './pages/app/Home';
import { Budget } from './pages/app/Budget';
import { Dashboard } from './pages/app/Dashboard';
import { Configurations } from './pages/app/Configurations';
import { ProductsAndServices } from './pages/app/ProductsAndServices';
import { ListBudget } from './pages/app/ListBudget';
import { Clients } from './pages/app/Clients';
import { Apresentation } from './pages/auth/Apresentation';
import { NewProductService } from './pages/app/ProductsAndServices/NewProductService';

const ProtectedRoute = ({ element, isAuthenticated }: any) => {
  if (!isAuthenticated) {
    return <SignIn />;
  }
  return element;
};

export const RoutesComponent = () => {
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/apresentation" element={<Apresentation />} />
        <Route path="/login" element={<SignIn />} />

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
          path="/clients"
          element={
            <ProtectedRoute
              element={<Clients />}
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
