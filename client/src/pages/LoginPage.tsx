import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "@/components/Form";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppselector } from "@/hooks/hook";
import { loginAsync } from "@/store/slices/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, error, token } = useAppselector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/vocabulary");
    }
  }, [navigate, token]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync({ username, password }));
  };

  const formHeader = <h2>Login to your account</h2>;
  const formFooter = (
    <p>
      Don't have an account? <a href="/signup">Sign up</a>
    </p>
  );

  return (
    <>
      <Form
        onSubmit={handleLogin}
        header={formHeader}
        footer={formFooter}
        error={error}
      >
        <div>
          <label>username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </Form>
      {loading && (
        <div className="overlay">
          <Spinner size={100} color="#007bff" />
        </div>
      )}
    </>
  );
};
export default LoginPage;
