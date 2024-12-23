import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "100px", color: "red" }}>404</h1>
      <p style={{ fontSize: "24px" }}>Oops! The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/HomePage" style={{ fontSize: "18px", color: "blue" }}>
          Go back to Home
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
