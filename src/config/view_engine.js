const path = require("path");
const express = require("express");

const view_engine = (app) => {
  // config view engine ejs in nodejs
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
  // config static file in nodejs
  app.use("/static", express.static(path.join(__dirname, "../", "public")));
};
module.exports = view_engine;
