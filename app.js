const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

const loginrouter = require("./server/routers/loginrouter.js");
const bookrouter = require("./server/routers/bookrouter.js");

app.use("/", loginrouter);
app.use("/books", bookrouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
