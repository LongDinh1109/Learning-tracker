import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AuthRoute from "./components/AuthRoute";
// import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import NewVocabulary from "./pages/NewVocabulary";
import Header from "./components/Header";
function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/vocabulary"
            element={
              <AuthRoute>
                <NewVocabulary />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
