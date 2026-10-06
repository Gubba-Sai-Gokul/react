import { NavLink, Outlet } from "react-router-dom";
import styles from "./pages/App.module.css";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

function App() {
  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/user">User</NavLink>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<SpinnerFullPage />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
