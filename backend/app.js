import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import internshipRouter from "./routes/internship.routes.js";
import blogRouter from "./routes/blog.routes.js";
import codeExecuteRouter from "./routes/codingArena.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/internships", internshipRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/execute", codeExecuteRouter);

// http://localhost:8000/api/v1/users/register
export { app };