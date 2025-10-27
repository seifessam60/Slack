import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/innjest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chatRoutes.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());

app.get("/debug-sentry", function main(req, res) {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server is running on port: ${ENV.PORT}`);
        connectDB();
      });
    }
  } catch (error) {
    console.error("Error Starting the Server");
    process.exit(1);
  }
};

startServer();

export default app;
