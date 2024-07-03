const Project = require("../models/project_model");

const get_all_project = async () => {
  try {
    const data = await Project.find().populate("userInfor");
    return {
      error: false,
      data,
      message: "Get all project success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Get all project failed",
    };
  }
};

const get_project_by_id = async (id) => {
  const filter = { _id: id };
  try {
    const data = await Project.findById(filter).populate("userInfor");
    return {
      error: false,
      data,
      message: "Get project by id success",
    };
  } catch (error) {
    return {
      error: false,
      data,
      message: "Get project by id failed",
    };
  }
};

const create_project = async (data) => {
  try {
    const result = await new Project(data).save();
    return {
      error: false,
      data: result,
      message: "Create project success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Create project failed",
    };
  }
};

const add_user_to_project = async (data) => {
  try {
    const { projectId, usersArr } = data;
    const filter = { _id: projectId };
    const myProject = await Project.findById(projectId);
    for (const [index1] of usersArr.entries()) {
      let check = false;
      for (const [index2] of myProject.userInfor.entries()) {
        const id_user = usersArr[index1];
        const id_user_inproject = myProject.userInfor[index2]._id.toString();
        check = id_user === id_user_inproject ? true : false;
        if (check) break;
      }
      !check && myProject.userInfor.push(usersArr[index1]);
    }
    const result = await Project.findByIdAndUpdate(filter, myProject);
    return {
      error: false,
      data: result,
      message: "Add user to project success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Add user to project failed",
    };
  }
};

const delete_project_by_id = async (id_project) => {
  try {
    const filter = { _id: id_project };
    const result = await Project.findOneAndUpdate(filter, {
      deleted: true,
    });
    return {
      error: false,
      data: result,
      message: "Delete project by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Delete project by id failed",
    };
  }
};

const delete_user_by_id_form_project = async (id_user, id_project) => {
  try {
    const myProject = await Project.findById(id_project);
    await myProject.userInfor.pull(id_user);
    const result = await myProject.save();
    return {
      error: false,
      data: result,
      message: "Delete user by id from project success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Delete user by id from project failed",
    };
  }
};

const delete_multiple_user_by_id_form_project = async (
  id_project,
  arr_id_user
) => {
  let delete_success = [];
  let delete_error = [];
  for (const [index] of arr_id_user.entries()) {
    const result_delete = await delete_user_by_id_form_project(
      arr_id_user[index],
      id_project
    );
    if (result_delete.error === false) delete_success.push(result_delete.data);
    else delete_error.push(result_delete.data);
  }
  return {
    error: delete_error.length > 0 ? true : false,
    delete_success,
    delete_error,
    message: `Delete multiple user by id from project success ${delete_success.length} and failed: ${delete_error.length}`,
  };
};

const undelete_project_by_id = async (id_project) => {
  try {
    const filter = { _id: id_project };
    await Project.restore(filter);
    const result = await Project.findOneAndUpdate(filter, {
      deleted: false,
    });
    return {
      error: false,
      data: result,
      message: "Undelete project by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Undelete project by id failed",
    };
  }
};

module.exports = {
  create_project,
  add_user_to_project,
  get_all_project,
  get_project_by_id,
  delete_user_by_id_form_project,
  delete_project_by_id,
  delete_multiple_user_by_id_form_project,
  undelete_project_by_id,
};
