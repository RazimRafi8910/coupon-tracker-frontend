import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
        <Spinner animation="border" variant="dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}

export default Loader;