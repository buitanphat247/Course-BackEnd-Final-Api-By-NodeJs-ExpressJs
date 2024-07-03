const {
  get_all_user,
  get_user_by_id,
  create_single_user,
  create_multiple_user,
  update_user_by_id,
  delete_single_user_by_id,
  delete_multiple_user_by_id,
  undelete_multiple_user_by_id,
  undelete_single_user_by_id,
} = require("../service/service.user");

module.exports = {
  get_user: async (req, res) => {
    let result;
    if (req.body.type === "get_all_user") {
      result = await get_all_user();
    } else if (req.body.type === "get_user_by_id") {
      result = await get_user_by_id(req.body.id);
    }
    res.send(result);
  },
  post_user: async (req, res) => {
    let result;
    if (req.body.type === "create_single_user") {
      result = await create_single_user(
        ({ username, email, phone, age } = req.body)
      );
    } else if (req.body.type === "create_multiple_user") {
      result = await create_multiple_user(req.body.user_array);
    }
    res.send(result);
  },
  put_user: async (req, res) => {
    let resutl = await update_user_by_id(
      req.body.id,
      ({ username, email, phone, age } = req.body)
    );
    res.send(resutl);
  },
  delete_user: async (req, res) => {
    let result;
    if (req.body.type === "delet_user_single")
      result = await delete_single_user_by_id(req.body.id);
    else result = await delete_multiple_user_by_id(req.body.array_id);
    res.send(result);
  },
  undelete_user: async (req, res) => {
    let result;
    if (req.body.type === "undelete_single_user_by_id") {
      result = await undelete_single_user_by_id(req.body.id);
    } else {
      result = await undelete_multiple_user_by_id(req.body.id_user_array);
    }
    res.send(result);
  },
};
