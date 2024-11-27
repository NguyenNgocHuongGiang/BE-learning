import express from "express";
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// define middleware public hinh
app.use(express.static("."))

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

//them middleware de get info cookie
app.use(cookieParser())

// them middleware de doc json
app.use(express.json());
// app.use(express.static("."));

app.use(rootRoutes);

app.listen(8080, () => {
  console.log("server is running in port 8080");
});