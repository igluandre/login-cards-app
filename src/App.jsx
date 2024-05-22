import { AuthProvider } from "./auth/context";
import { HomePage } from "./auth/pages/HomePage";
import "./styles.css";

export const App = () => {
  return (
    <>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </>
  );
}
