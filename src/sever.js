require("dotenv").config();
const express = require("express");
const expressFileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const view_engine = require("./config/view_engine");
const connection = require("./config/database");
/**------------------------------------------------------- */
// config router
const router = require("./router/api");
const app = express();
/**------------------------------------------------------- */
// config middleware to handle json
app.use(bodyParser.json());
// config file upload
app.use(expressFileupload());
// config view engine
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// khai báo route
app.use("/v1/api", router);
// config file upload
view_engine(app);
connection();

app.listen(process.env.Port, process.env.Localhost, () => {
  console.log(`Example app listening on port ${process.env.Port}`);
});
