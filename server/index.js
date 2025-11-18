import express from "express";
import dotenv from "dotenv";
import { sendContactEmail } from "./routes/emailRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.post("/api/send-email", sendContactEmail);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});