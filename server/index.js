require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const authController = require("./controllers/authController");
const session = require("express-session");
const axios = require("axios");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const cors = require("cors");
const bodyParser = require("body-parser");
const mc = require("./controllers/maps/mapscontroller");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
//
AWS.config.setPromisesDependency(bluebird);
//
const s3 = new AWS.S3();
//

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};
app.use(express.static(`${__dirname}/../build`));
app.use(express.json());
const { CONNECTION_STRING, SESSION_SECRET, KEY } = process.env;
const { contactForm } = require("./controllers/contactForm");
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Connected");
  })
  .catch(err => {
    err;
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
// app.post("/auth/location", mc.Location);
app.get("/auth/posts/user/:id", authController.getPostsbyUser);
app.get("/auth/profile/page/:id", authController.getProfileInfo);
app.post("/api/contact", contactForm);
app.put("/auth/profileSetup", authController.profileSetup);
app.get("/auth/getLikes/:id", authController.getLikes);
app.get("/auth/getCommentCountHome/:id", authController.getCommentCountHome);
app.get("/auth/getCommentCount/:id", authController.getCommentCount);
app.post("/auth/addComment/:id", authController.addComment);
app.get("/auth/comment/:id", authController.getComment);
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
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.5308,112.2983&radius=1500&type=golf&keyword=golf&key=AIzaSyAYc5zf8Pk1IyMfT0CLUHWWHtflYwm79qc"
    )
    .then(response => {
      response;
      res.json(response.data);
    });
});
app.post("/auth/addimage", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
});
app.post("/auth/addProfilePic", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
});

const configureRoutes = require("./routes");
configureRoutes(app);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = 3131;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
