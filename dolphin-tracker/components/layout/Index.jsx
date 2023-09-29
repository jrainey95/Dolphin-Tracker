import './index.scss';
import React from "react";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <h1></h1>
      </header>
      <main>{children}</main>
      <main>Results</main>
      <footer>
        <p> </p>
      </footer>
    </div>
  );
}

// Add prop validation
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a React node and is required.
};

export default Layout;
