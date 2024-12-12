import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router";
import style from "../styles/components/header.module.css";
import logo from "../assets/dodo-icon.svg";
import { loginAsync, logout } from "@/store/slices/authSlice";
import { useAppDispatch, useAppselector } from "@/hooks/hook";
export default function Header() {
  const { token } = useAppselector((state) => state.auth);
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? style.activated : "";
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("token");
    dispatch(logout());
  };

  const handleLoginDemoAcc = () => {
    dispatch(
      loginAsync({
        username: "long",
        password: "123456789",
      })
    );
    navigate("/vocabulary");
  };
  return (
    <div className={style.header} style={style}>
      <div className={style.group}>
        <Link to="/">
          <img src={logo} className={style.logo} />
        </Link>
        <NavLink to="/vocabulary" className={navLinkClass}>
          Vocabulary
        </NavLink>
        {token && (
          <>
            <NavLink to="/tracking" className={navLinkClass}>
              Tracking
            </NavLink>
            <NavLink to="/history" className={navLinkClass}>
              History
            </NavLink>
          </>
        )}
      </div>
      <div className={style.group}>
        
      </div>
      <div className={style.group}>
        <Link onClick={handleLoginDemoAcc} to="/">
          Demo User
        </Link>
        {!token ? (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            {/* <NavLink to="/signup" className={navLinkClass}>
              Signup
            </NavLink> */}
          </>
        ) : (
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}
