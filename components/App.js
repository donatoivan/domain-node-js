import React from "react";
import ReactDOM from "react-dom";
import Hcard from "./Hcard";
import axios from "axios";

axios
  .get("http://localhost:5000/data", {
    params: { id: document.cookie.split("=")[1] },
  })
  .then((response) => {
    ReactDOM.render(
      <Hcard {...response.data}></Hcard>,
      document.querySelector(".HcardApp")
    );
  });
