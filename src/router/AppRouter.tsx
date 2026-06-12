import { AuthPage, Landing } from "@/pages";
import { Route, Routes } from "react-router";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<AuthPage isSignup />} />
    </Routes>
  );
};
