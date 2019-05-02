import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Profile from "./profile";
import Courses from "./courses";
import Login from "./Login";
import Upgrade from "./upgrade";
import Post from "../post";
import ProfilePage from "./ProfilePage";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/courses" component={Courses} />
    <Route path="/login" component={Login} />
    <Route path="/upgrade" component={Upgrade} />
    <Route path="/post/:id" component={Post} />
    <Route path="/profile-page/:id" component={ProfilePage} />
  </Switch>
);
