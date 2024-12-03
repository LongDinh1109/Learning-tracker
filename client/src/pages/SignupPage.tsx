import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import Form from "@/components/Form";

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signupUser(username, email, password);
      navigate("/login");
    } catch (err) {
      setError((err as Error).message);
    }
  };
  const header = <h2>Create a new account</h2>;
  const footer = (
    <p>
      Already have an account? <a href="/login">Login</a>
    </p>
  );

  return (
    <Form onSubmit={handleSignup} header={header} footer={footer} error={error}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit">Sign Up</button>
    </Form>
  );
};

export default SignupPage;
