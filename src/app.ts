import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

// parser
app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use('/api', router);

app.use("/test", (req, res) => {
    res.send("test route");
})

app.get("/", (req, res) => {
    res.send("Welcome to Final Form API!");
})

app.use(globalErrorHandler);

app.use(notFound);

export default app;