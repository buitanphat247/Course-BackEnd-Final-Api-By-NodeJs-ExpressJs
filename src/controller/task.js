const {
  create_task,
  create_multiple_task,
  get_all_task,
  delete_single_task_by_id,
  undelte_single_task_by_id,
  delete_multiple_task_by_id,
  undelte_multiple_task_by_id,
} = require("../service/sevice.task");

module.exports = {
  get_task: async (req, res) => {
    const { type } = req.body;
    if (type === "get_all_task") {
      result = await get_all_task();
    }
    if (type === "get_task_by_id") {
      result = await get_task_by_id(req.body.id);
    }
    res.send(result);
  },

  post_task: async (req, res) => {
    const { type } = req.body;
    let result;
    if (type === "create_single_task") {
      result = await create_task(req.body);
    }
    if (type === "create_multiple_task") {
      const { task_arr } = req.body;
      result = await create_multiple_task(task_arr);
    }
    res.send(result);
  },

  delete_task: async (req, res) => {
    const { type } = req.body;
    let result;
    if (type === "delete_single_task_by_id") {
      const { id_task_delete } = req.body;
      result = await delete_single_task_by_id(id_task_delete);
    }
    if (type === "delete_multiple_task_by_id") {
      result = await delete_multiple_task_by_id(req.body.id_task_array_delete);
    }
    res.send(result);
  },

  undelete_task: async (req, res) => {
    const { type } = req.body;
    let result;
    if (type === "undelete_single_task_by_id") {
      result = await undelte_single_task_by_id(req.body.id_task_undelete);
    } else {
      result = await undelte_multiple_task_by_id(req.body.id_task_arr_undelete);
    }
    res.send(result);
  },
};
