import React from "react";
import "../assets/css/PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <div className="ball"></div>
      </div>
    </div>
  );
};

export default PageNotFound;
