import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div id="pageNotFound">
      <div>
        <h1>Page not found</h1>
        <Link to="/">Return home</Link>
      </div>
    </div>
  );
}
