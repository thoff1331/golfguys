const nodemailer = require("nodemailer");

module.exports = {
  contactForm: (req, res) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "golfguys1331@gmail.com",
        pass: "trevor2416!"
      }
    });

    let mailOptions = {
      from: "GolfGuys",
      to: "Trevorrhoffman@gmail.com",
      subject: "NODEMAILER",
      text: "Something Happened",
      html: `<h2>You've got a contact form from Golfguys.</h2>
      <p>First Name: ${req.body.first_name}<p>
      <p>Last Name: ${req.body.last_name}<p>
      <p>Email: ${req.body.email}<p>
      <p>Message: ${req.body.message}<p>`
    };

    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Email Sent");
      }
    });
    res.sendStatus(200);
  }
};
