import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log("Server on :", PORT));
