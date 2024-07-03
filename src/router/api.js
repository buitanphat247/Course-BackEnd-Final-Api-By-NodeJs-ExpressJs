const express = require("express");
const {
  get_user,
  post_user,
  put_user,
  delete_user,
  undelete_user,
} = require("../controller/user");
const {
  get_customer,
  post_customer,
  put_customer,
  delete_customer,
  undelete_customer,
} = require("../controller/customer");
const { post_file } = require("../controller/file");
const {
  post_project,
  get_project,
  delete_project,
  undelete_project,
} = require("../controller/project");

const router = express.Router();

router.post("/file", post_file);

router.get("/user", get_user);
router.post("/user", post_user);
router.put("/user", put_user);
router.delete("/user", delete_user);
router.delete("/undelete_user", undelete_user);

router.get("/customer", get_customer);
router.post("/customer", post_customer);
router.put("/customer", put_customer);
router.delete("/customer", delete_customer);
router.delete("/undelete_customer", undelete_customer);

router.get("/project", get_project);
router.post("/project", post_project);
router.delete("/project", delete_project);
router.delete("/undelete_project", undelete_project);

module.exports = router;
