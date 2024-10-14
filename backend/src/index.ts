import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import summaryRoutes from "./routes/summaryRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 80;
const oneDayInMs = 24 * 60 * 60 * 1000;
const maxRequests = 50;
let requestCount = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["POST"],
//   })
// );
app.use((req: Request, res: Response, next: NextFunction) => {
  requestCount++;
  if (requestCount > maxRequests) {
    res
      .status(429)
      .json({ error: "Request limit reached. Please try again later." });
  } else {
    next();
  }
});
app.use("/api", summaryRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running`);
});

const resetRequestCount = () => {
  setTimeout(() => {
    requestCount = 0;
    resetRequestCount();
  }, oneDayInMs);
};
resetRequestCount();
