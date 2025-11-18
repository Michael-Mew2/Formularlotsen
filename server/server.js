import express from "express";
import dotenv from "dotenv";
import { sendContactEmail } from "./routes/emailRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.post("api/send-email", sendContactEmail);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});