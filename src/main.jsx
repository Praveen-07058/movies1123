import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";

import { createTheme, ThemeProvider } from "flowbite-react";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </ThemeProvider>
  </Provider>
);
