import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./contact.scss";
const nodemailer = require("nodemailer");

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      message: this.state.message
    };

    axios.post("/api/contact", data).then(this.setState({ button: true }));
  }

  render() {
    if (this.state.button) {
      return <Redirect to="/" />;
    }
    return (
      <div className="contact-background">
        <div>
          <form
            autocomplete="off"
            className="contact-form"
            onSubmit={this.handleSubmit}
          >
            <h1 className="contact-us">Contact Us</h1>
            <input
              className="input-contact"
              placeholder="First Name"
              onChange={this.handleChange}
              value={this.state.first_name}
              name="first_name"
            />
            <input
              className="input-contact"
              placeholder="Last Name"
              onChange={this.handleChange}
              value={this.state.last_name}
              name="last_name"
            />
            <input
              className="input-contact"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
            />
            <textarea
              className="input-contact"
              placeholder="Message"
              onChange={this.handleChange}
              value={this.state.message}
              name="message"
            />
            <button className="contact-form-submit-button">Get In Touch</button>
          </form>
        </div>
      </div>
    );
  }
}
