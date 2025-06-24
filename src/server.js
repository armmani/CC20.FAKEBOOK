import dotenv from "dotenv";
import app from "./app.js";
import shutdown from "./utils/shutdown.util.js";

dotenv.config();

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log("Server on :", PORT));

process.on("SIGINT", () => shutdown("SIGINT"));
