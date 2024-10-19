import express from "express";
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";

const app = express();

app.use(cors());

// them middleware de doc json
app.use(express.json());
// app.use(express.static("."));

app.use(rootRoutes);

app.listen(8080, () => {
  console.log("server is running in port 8080");
});