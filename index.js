import express from "express";
import cookieParser from "cookie-parser";
import { renderHome, updateUser } from "./controller/controller";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", renderHome);
app.post("/update", updateUser);

app.use(express.static("static"));

export default app;
