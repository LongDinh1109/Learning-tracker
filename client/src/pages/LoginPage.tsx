import { useState, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Form from "@/components/Form";
import Spinner from "@/components/Spinner";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/vocabulary" />;
  }

  const handleLogin = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const data = await loginUser(username, password); // Call the API service function
      login(data.token); // Store token in localStorage
      navigate("/vocabulary"); // Redirect to a protected page
    } catch (err) {
      setError((err as Error).message); // Handle any errors
      setUsername("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
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
      {isLoading && (
        <div className="overlay">
          <Spinner size={100} color="#007bff" />
        </div>
      )}
    </>
  );
};

export default LoginPage;
