import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './components/AddProduct/AddProduct';
import Contact from './components/Contact/Contact';
import Customers from './components/Customer/Customer';
import MainDash from './components/DashBoard/MainDash/MainDash';
import { RightSide } from './components/DashBoard/RightSide/RightSide';
import SideBar from './components/DashBoard/SideBar/SideBar';
import Login from './components/Login';
import Orders from './components/Orders/Order';
import Products from './components/Product/Product';
import Signup from './components/Signup';
import Users from './components/Users/Users';
import RefereshHandler from './RefereshHandler';

// PrivateRoute component
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to='/login' />;
};

// Main Layout (with SideBar and RightSide)
const MainLayout = ({ children }) => {
  return (
    <div className="App">
      <div className='AppGlass'>
        <SideBar />
        {children}
        <RightSide />
      </div>
    </div>
  );
};

// Auth Layout (without SideBar and RightSide)
const AuthLayout = ({ children }) => {
  return (
    <div className="APP bg-red-300">
      {children}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <RefereshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Auth Routes (Login and Signup) */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login setIsAuthenticated={setIsAuthenticated} />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        {/* Main Routes (with SideBar and RightSide) */}
        <Route
          path="/"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <MainDash />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/DashBoard"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <MainDash />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/Products"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <Products />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/Customer"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <Customers />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/Orders"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <Orders text={"All Orders"} />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/Contact"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <Contact />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/AddProducts"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <AddProduct />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/Users"
          element={
            <PrivateRoute
              element={
                <MainLayout>
                  <Users text={"All Users"} />
                </MainLayout>
              }
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
}
export default App;


