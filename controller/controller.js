import React from "react";
import Hcard from "../components/Hcard";
import { renderToString } from "react-dom/server";
import { save } from "../db/db";

export const renderHome = (req, res) => {
  const content = renderToString(<Hcard />);
  const html = `
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Live hCard Preview</title>

      <link href="css/bootstrap.min.css" rel="stylesheet" >
      <link href="css/main.css" rel="stylesheet">
    </head>
    <body>
      <div class="HcardApp">${content}</div>
      <script src="App.js"></script>
    </body>
  </html>
  `;

  res.send(html);
};

export const updateUser = (req, res) => {
  let id;
  const { body, cookies } = req;

  if (cookies.hCardUser) {
    id = save(cookies.hCardUser, body);
  } else {
    id = save(null, body);
  }

  res.cookie("hCardUser", id, { httpOnly: false });
  res.redirect("/");
};

export const submitForm = (req, res) => {
  let id;
  const { body, cookies } = req;

  if (cookies.hCardUser) {
    id = save(cookies.hCardUser, body);
  } else {
    id = save(null, body);
  }

  res.cookie("hCardUser", id, { httpOnly: false });
  res.redirect("/");
};
