import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./utils/AuthContext.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { store } from "./redux/Store.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const theme = createTheme();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AuthContextProvider>
          <App />
          <Toaster position="top-right" />
        </AuthContextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
