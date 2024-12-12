import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import Form from "@/components/Form";
import { useAppDispatch, useAppselector } from "@/hooks/hook";
import { signupAsync } from "@/store/slices/authSlice";
import Spinner from "@/components/Spinner";

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, error } = useAppselector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(signupAsync({ username, email, password }));
    navigate("/login");
    // try {
    //   await signupUser({ username, email, password });
    //   navigate("/login");
    // } catch (err) {
    //   setError((err as Error).message);
    // }
  };
  const header = <h2>Create a new account</h2>;
  const footer = (
    <p>
      Already have an account? <a href="/login">Login</a>
    </p>
  );

  return (
    <>
      <Form
        onSubmit={handleSignup}
        header={header}
        footer={footer}
        error={error}
      >
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
      {loading && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default SignupPage;
