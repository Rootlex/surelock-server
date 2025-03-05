import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";

const PORT = process.env.PORT || 9181;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`);
    routes(app);
});
