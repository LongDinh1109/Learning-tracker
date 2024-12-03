import { Link } from "react-router-dom";
import { NavLink } from "react-router";
import style from "../styles/components/header.module.css";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/dodo-icon.svg";
export default function Header() {
  const { token, logout } = useAuth();
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? style.activated : "";
  };
  return (
    <div className={style.header} style={style}>
      <div className={style.group}>
        <Link to="/">
          <img src={logo} className={style.logo} />
        </Link>
      </div>
      <div className={style.group}>
        <NavLink to="/vocabulary" className={navLinkClass}>
          Vocabulary
        </NavLink>
      </div>
      <div className={style.group}>
        {!token ? (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={navLinkClass}>
              Signup
            </NavLink>
          </>
        ) : (
          <Link onClick={logout} to="/">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
