import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/gobal.css";
import App from "./App.tsx";
import "./index.css";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
