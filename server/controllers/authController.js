const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");
  const { pp, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const result = await db.signup([pp, username, hash]).catch(err => {
    res.status(400).json("Username already exists");
  });
  req.session.user = { username: result[0].username, pp: result[0].pp };
  res.json(result);
};
const login = async (req, res) => {
  console.log(req.body);
  const db = req.app.get("db");

  const results = await db.verify(req.body.username);
  if (results[0]) {
    // check the password
    const isMatch = await bcrypt.compare(
      req.body.password,
      results[0].password
    );
    console.log(isMatch);
    if (isMatch) {
      req.session.user = {
        username: results[0].username,
        pp: results[0].pp
      };
      res.status(200).json(req.session.user);
    } else {
      res.status(403).json("Error: Wrong password");
    }
  } else {
    res.status(403).json("Error: Wrong username.");
  }
};
const getmessages = (req, res) => {
  const db = req.app.get("db");
  db.get_messages().then(messages => res.status(200).json(messages));
};
const addmemory = (req, res) => {
  const db = req.app.get("db");
  const { messages, image } = req.body;

  db.add_memory([messages, image, req.session.user.username])
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err));
};
const deleteone = (req, res, next) => {
  console.log(req.params.id);
  const db = req.app.get("db");
  const { id } = req.params;
  db.delete_message(id)
    .then(messages => res.status(200).json(messages))
    .catch(err => console.log(err));
};
const getuser = function(req, res, next) {
  const { session } = req;
  if (!session.user) {
    session.user = { username: "", pp: "" };
  }
  res.json(session.user);
  next();
};
const logout = (req, res) => {
  console.log(req.session);
  req.session.destroy().then(response => {
    res.sendStatus(200);
    console.log(req.session);
  });
};
const getPost = (req, res) => {
  console.log(req.params);
  const db = req.app.get("db");
  db.get_post(+req.params.id).then(post => res.status(200).json(post));
};
const getProfile = (req, res) => {
  console.log(req.params);
  const db = req.app.get("db");
  db.get_profile(+req.params.id).then(profile => res.status(200).json(profile));
};
// const addComment(req,res) => {

// }

module.exports = {
  signup,
  login,
  getmessages,
  addmemory,
  deleteone,
  getuser,
  logout,
  getPost,
  getProfile
};
