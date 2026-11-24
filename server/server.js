const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({
    path: require("path").join(__dirname, ".env")
});

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authenticate");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "StudentMart API is running"
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
    });
