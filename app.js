const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const loginrouter = require("./server/routers/loginrouter.js");
const dashrouter = require("./server/routers/dashrouter.js");
const adminrouter = require("./server/routers/adminrouter.js");

app.use("/", loginrouter);
app.use("/dashboard", dashrouter);
app.use("/admin", adminrouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
