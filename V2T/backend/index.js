const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
	console.log("Hey");
});

app.post("/register", (req, res) => {
	console.log("Register");
});

app.listen(5005, () => {
	console.log("Server started");
});
