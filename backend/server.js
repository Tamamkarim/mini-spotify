import express from "express";
import cors from "cors";
import songs from "./routes/songRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/songs", songs);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
	console.log("server running");
});
