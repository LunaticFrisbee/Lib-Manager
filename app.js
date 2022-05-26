const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const loginroute = require("./server/routers/loginroute.js");

app.use("/", loginroute);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
