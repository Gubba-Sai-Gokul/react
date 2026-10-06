import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import User from "./components/User";
import { CityProvider } from "./contexts/CityContextProvider";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import NotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const NotFound = lazy(() => import("./pages/PageNotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FakeAuthProvider>
        <App />
      </FakeAuthProvider>
    ),
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      { path: "pricing", element: <Pricing /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <CityProvider>
              <AppLayout />
            </CityProvider>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate replace to="cities" /> },
          { path: "cities", element: <CityList /> },
          { path: "cities/:id", element: <City /> },
          { path: "countries", element: <CountryList /> },
          { path: "form", element: <Form /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
