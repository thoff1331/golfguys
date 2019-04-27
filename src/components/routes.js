import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Profile from "./profile";
import Courses from "./courses";
import Login from "./Login";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/courses" component={Courses} />
    <Route path="/login" component={Login} />
  </Switch>
);
