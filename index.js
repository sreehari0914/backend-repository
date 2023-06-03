const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userRoute=require("./routes/auth")
const postRoute= require("./routes/post")
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/users",userRoute) //to redirect to userroute when/users is pressed
app.use("/posts",postRoute)
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
