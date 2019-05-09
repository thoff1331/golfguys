import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/home";
import Signup from "../signup/signup";
import Profile from "../user_profile/profile";
import Courses from "../courses/courses";
import Login from "../login/Login";
import Upgrade from "../upgrade/upgrade";
import Post from "../post/post";
import ProfilePage from "../profile_pages/ProfilePage";
import Contact from "../contact/contact";

export default (
  <Switch>
    <Route path="/contact" component={Contact} />
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/courses" component={Courses} />
    <Route path="/login" component={Login} />
    <Route path="/upgrade" component={Upgrade} />
    <Route path="/post/:id" component={Post} />
    ``
    <Route path="/profile-page/:id" component={ProfilePage} />
  </Switch>
);
