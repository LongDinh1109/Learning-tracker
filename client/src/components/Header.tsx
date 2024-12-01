import { Link } from "react-router-dom";
import { NavLink } from "react-router";
import style from "../styles/components/header.module.css";
import { useAuth } from "../context/AuthContext";
export default function Header() {
  const { token, logout } = useAuth();
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? style.activated : ''
  }
  return (
    <div className={style.header} style={style}>
      {!token ? (
        <>
          <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          <NavLink to="/signup" className={navLinkClass} >Signup</NavLink>
        </>
      ) : (
        <Link onClick={logout} to="/">
          Logout
        </Link>
      )}
    </div>
  );
}
