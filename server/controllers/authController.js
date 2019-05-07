const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");

  const { pp, username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const result = await db.signup([pp, username, hash]).catch(err => {
    res.status(400).json("Username already exists");
  });

  req.session.user = {
    username: result[0].username,
    pp: result[0].pp,
    userId: result[0].user_id
  };
  res.json(req.session.user);
};
const login = async (req, res) => {
  req.body;
  const db = req.app.get("db");

  const results = await db.verify(req.body.username);
  if (results[0]) {
    // check the password
    const isMatch = await bcrypt.compare(
      req.body.password,
      results[0].password
    );
    isMatch;
    if (isMatch) {
      req.session.user = {
        username: results[0].username,
        pp: results[0].pp,
        userId: results[0].user_id
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
  db.get_messages().then(messages => {
    console.log(messages);
    res.status(200).json(messages);
  });
};
const addmemory = (req, res) => {
  const db = req.app.get("db");
  const { caption, image } = req.body;
  console.log(req.session.user.userId);
  db.add_memory([
    caption,
    image,
    req.session.user.username,
    req.session.user.userId
  ])
    .then(response => res.status(200).json(response))
    .catch(err => err);
};
const deleteone = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  db.delete_message(id)
    .then(messages => res.status(200).json(messages))
    .catch(err => err);
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
  req.session.destroy();
  res.sendStatus(200);
};
const getPost = (req, res) => {
  const db = req.app.get("db");
  db.get_post(+req.params.id).then(post => res.status(200).json(post));
};
const getProfile = (req, res) => {
  const db = req.app.get("db");
  db.get_profile(+req.params.id).then(profile => res.status(200).json(profile));
};
const getComment = (req, res) => {
  const db = req.app.get("db");
  console.log(+req.params.id);
  db.get_comments(+req.params.id)
    .then(comment => {
      console.log(comment);
      res.status(200).json(comment);
    })
    .catch(err => console.log("1*****", err));
};
const addComment = async (req, res) => {
  const db = req.app.get("db");
  const { content } = req.body;
  const commentCount = await db.add_comment([
    req.session.user.username,
    content,
    +req.params.id
  ]);

  if (commentCount) {
    db.update_comment_count([+commentCount[0].count, +req.params.id]);
    console.log(+commentCount[0].count);
    // res.status(200).json(comment);
  }

  // .catch(err => console.log(err));
};
const getCommentCount = (req, res) => {
  const db = req.app.get("db");
  db.get_comment_count(+req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => console.log("1*****", err));
};

const getCommentCountHome = (req, res) => {
  console.log("hey");
  console.log(req.params.id);
  const db = req.app.get("db");
  db.get_comment_count_home(+req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => console.log(err));
};
const getLikes = (req, res) => {
  console.log("hit");
  const db = req.app.get("db");
  db.get_likes(+req.params.id)
    .then(likes => res.status(200).json(likes))
    .catch(err => console.log(err));
};
const profileSetup = (req, res) => {
  console.log(+req.session.user.userId);
  const { course, handicap, rounds, career } = req.body;
  const db = req.app.get("db");
  db.profile_setup([course, handicap, rounds, career, +req.session.user.userId])
    .then(profile => res.status(200).json(profile))
    .catch(err => console.log(err));
};

module.exports = {
  signup,
  login,
  getmessages,
  addmemory,
  deleteone,
  getuser,
  logout,
  getPost,
  getProfile,
  getComment,
  addComment,
  getCommentCount,
  getCommentCountHome,
  getLikes,
  profileSetup
};
