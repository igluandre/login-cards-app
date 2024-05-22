import { useContext } from "react";
import "../styles/Navbar.css";
import { AuthContext } from "../../auth/context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header className="navbar">
        <div className="container flex">
          <nav className="flex">
            <p>Hello, {user.username}</p>
            <button onClick={() => logout()}>Logout</button>
          </nav>
        </div>
      </header>
    </>
  );
};
