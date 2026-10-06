import { Link, Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />
      <Outlet />
    </div>
  );
}
