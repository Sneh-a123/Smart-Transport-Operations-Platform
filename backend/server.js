const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});