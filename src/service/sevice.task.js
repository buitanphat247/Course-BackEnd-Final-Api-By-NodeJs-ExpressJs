const taskModel = require("../models/task_model");

const get_all_task = async () => {
  try {
    const data = await taskModel.find();
    return {
      error: false,
      data,
      message: "Get all task success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Get all task failed " + error,
    };
  }
};

const get_task_by_id = async (id) => {
  try {
    const data = await taskModel.findById(id);
    return {
      error: false,
      data,
      message: "Get task by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Get task by id failed " + error,
    };
  }
};

const create_task = async (data) => {
  try {
    const result = await new taskModel(data).save();
    return {
      error: false,
      data: result,
      message: "Create task success",
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      error: true,
      data: null,
      message: "Create task failed " + error,
    };
  }
};

const create_multiple_task = async (data) => {
  const create_success = [];
  const create_failed = [];
  for (const [index] of data.entries()) {
    const result_create_task = await create_task(data[index]);
    if (result_create_task.error === false) {
      create_success.push(result_create_task.data);
    } else {
      create_failed.push(result_create_task.data);
    }
  }
  return {
    error: create_failed.length > 0 ? true : false,
    create_success,
    create_failed,
    message: `Create multiple task success ${create_success.length} and failed ${create_failed.length}`,
  };
  return false;
};

const delete_single_task_by_id = async (id_task) => {
  try {
    const task_by_id = await get_task_by_id(id_task);
    task_by_id.deleted = true;
    const filter = { _id: id_task };
    const result = await taskModel.findOneAndUpdate(filter, task_by_id);
    return {
      error: false,
      data: result,
      message: "Delete task success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Delete task failed " + error,
    };
  }
};

const delete_multiple_task_by_id = async (id_task_arr_delete) => {
  const delete_success = [];
  const delete_failed = [];
  for (const [index] of id_task_arr_delete.entries()) {
    const result_delete_task = await delete_single_task_by_id(
      id_task_arr_delete[index]
    );
    if (result_delete_task.error === false)
      delete_success.push(result_delete_task.data);
    else delete_failed.push(result_delete_task.data);
  }
  return {
    error: delete_failed.length > 0 ? true : false,
    delete_success,
    delete_failed,
    message: `Delete multiple task success ${delete_success.length} and failed ${delete_failed.length}`,
  };
};

const undelte_single_task_by_id = async (id_task) => {
  console.log("id_task: ", id_task);
  try {
    const filter = { _id: id_task };
    await taskModel.restore(filter);
    const result = await taskModel.findOneAndUpdate(filter, {
      deleted: false,
    });
    return {
      error: false,
      data: result,
      message: "Undelete task by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Undelete task by id failed " + error,
    };
  }
};

const undelte_multiple_task_by_id = async (id_task_arr_undelete) => {
  const undelete_success = [];
  const undelete_failed = [];
  for (const [index] of id_task_arr_undelete.entries()) {
    const result_undelete_task = await undelte_single_task_by_id(
      id_task_arr_undelete[index]
    );
    if (result_undelete_task.error === false)
      undelete_success.push(result_undelete_task.data);
    else undelete_failed.push(result_undelete_task.data);
  }
  return {
    error: undelete_failed.length > 0 ? true : false,
    undelete_success,
    undelete_failed,
    message: `Undelete multiple task success ${undelete_success.length} and failed ${undelete_failed.length}`,
  };
};

module.exports = {
  create_task,
  create_multiple_task,
  get_all_task,
  get_task_by_id,
  delete_single_task_by_id,
  delete_multiple_task_by_id,
  undelte_single_task_by_id,
  undelte_multiple_task_by_id,
};
