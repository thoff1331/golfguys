require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const authController = require("./controllers/authController");
const session = require("express-session");
const axios = require("axios");

app.use(express.json());
const { CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Connected");
  })
  .catch(err => {
    console.log(err);
  });
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);
app.get("/auth/profile/:id", authController.getProfile);
app.get("/auth/post/:id", authController.getPost);
app.get("/auth/logout", authController.logout);
app.get("/auth/cookie", authController.getuser);
app.post("/auth/signup", authController.signup);
app.post("/auth/login", authController.login);
app.get("/auth/messages", authController.getmessages);
app.post("/auth/add", authController.addmemory);
app.delete("/auth/delete/:id", authController.deleteone);
app.get("/api/getGoogle", (req, res) => {
  axios
    .get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.51606,-112.30155&radius=1500&type=golf&keyword=golf&key=AIzaSyAYc5zf8Pk1IyMfT0CLUHWWHtflYwm79qc"
    )
    .then(response => {
      console.log(response);
      res.json(response.data);
    });
});
const PORT = 3131;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
