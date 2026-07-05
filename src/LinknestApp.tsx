import { AuthContextProvider } from "./features/auth/context/AuthContext";
import { AppRouter } from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

export const LinknestApp = () => {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <AppRouter />
      </AuthContextProvider>
    </>
  );
};
