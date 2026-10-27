const express = require("express");
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const router = require("./router/UserRouter");
const noteRouter = require("./router/NoteRouter")
const app = express();
const cors = require("cors");
app.use(cors());


app.use(express.json());

const PORT = 3000;

connectDB();

app.use("/", router);
app.use("/notes",noteRouter)
app.get("/", (req, res) => {
    res.send("Welcome to Signup");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});