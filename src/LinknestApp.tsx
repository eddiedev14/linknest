import { AuthContextProvider } from "./features/auth/context/AuthContext";
import { AppRouter } from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "./shared/context/ThemeContext";

export const LinknestApp = () => {
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ToastContainer />
          <AppRouter />
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
};
