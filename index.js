import express from "express";
import React from "react";
import Hcard from "./components/Hcard";
import { renderToString } from "react-dom/server";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
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
});

app.use(express.static("static"));

app.listen(5000, () => {
  console.log(".......listening on port 5000");
});
