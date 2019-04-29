require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const authController = require("./controllers/authController");
const session = require("express-session");

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
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);
app.post("/auth/signup", authController.signup);
app.post("/auth/login", authController.login);

const PORT = 3131;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
