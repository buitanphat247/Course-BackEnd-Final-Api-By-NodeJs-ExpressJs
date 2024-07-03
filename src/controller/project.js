const {
  create_project,
  add_user_to_project,
  get_all_project,
  delete_user_by_id_form_project,
  delete_project_by_id,
  delete_multiple_user_by_id_form_project,
  undelete_project_by_id,
} = require("../service/service.project");

const get_project = async (req, res) => {
  const { type } = req.body;
  let result;
  if (type === "get_all_project") {
    result = await get_all_project();
  }
  if (type === "get_project_by_id")
    result = await get_project_by_id(req.body.id);
  res.send(result);
};

const post_project = async (req, res) => {
  let result = [];
  const { type, ...data } = req.body;
  if (type === "EMPTY-PROJECT") {
    result = await create_project(data);
  } else if (type === "ADD-USERS") {
    result = await add_user_to_project(data);
  }
  res.send(result);
};

const delete_project = async (req, res) => {
  let result;
  const type = req.body.type;
  if (type === "delete_user_form_project") {
    result = await delete_user_by_id_form_project(
      req.body.id_user,
      req.body.id_project
    );
  }
  if (type === "delete_arr_user_form_project") {
    result = await delete_multiple_user_by_id_form_project(
      req.body.id_project,
      req.body.arr_id_user
    );
  }
  if (type === "delete_project") {
    result = await delete_project_by_id(req.body.id_project);
  }
  res.send(result);
};

const undelete_project = async (req, res) => {
  console.log("req: ", req.body.id_project);
  const result = await undelete_project_by_id(req.body.id_project);
  console.log("result: ", result);
  res.send(result);
};

module.exports = {
  post_project,
  get_project,
  delete_project,
  undelete_project,
};
