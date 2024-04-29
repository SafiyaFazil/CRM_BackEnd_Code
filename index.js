import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./Database/dbconfig.js";
import { userRouter } from "./Routers/user.router.js";
import { isAuthenticated } from "./Middleware/auth.js";
import { productRouter } from "./Routers/product.router.js";
// import { adminRouter } from "./Routers/admin.router.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

dbConnection();

app.get("/", (req, res) => {
  res.send("Working Good..");
});

app.use("/api/user", userRouter);
// app.use("/api/admin", adminRouter);
app.use("/api/products", isAuthenticated, productRouter);

app.listen(port, () => {
  console.log("My App is Listening port: ", port);
});
