import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Task Manager</h1>
      <ul style={styles.navLinks}>
        {!token ? (
          <>
            <li>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/tasks" style={styles.link}>
                Tasks
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  navLinks: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default NavBar;
