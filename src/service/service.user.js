const User = require("../models/user_model");

const get_all_user = async () => {
  try {
    const user_result = await User.find({});
    console.log("user_result: ", user_result);
    return {
      error: false,
      data: user_result,
      message: "Get all user success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Get all user failed",
    };
  }
};

const get_user_by_id = async (id) => {
  try {
    const data_user_of_id = await User.findById(id);
    console.log("data_user_of_id: ", data_user_of_id);
    return {
      error: false,
      data: data_user_of_id,
      message: "Get user by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Get user by id failed",
    };
  }
};

const create_single_user = async ({ username, email, phone, age }) => {
  try {
    const result = await new User({
      username,
      email,
      phone,
      age,
    }).save();
    return {
      error: false,
      data: result,
      message: "Create single user success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Create single user failed",
    };
  }
};

const create_multiple_user = async (data_user_array) => {
  let create_success = [];
  let create_error = [];
  for (const [index] of data_user_array.entries()) {
    const result = await create_single_user(
      ({ username, email, phone, age } = data_user_array[index])
    );
    if (result.error === false) {
      create_success.push(result.data);
    } else {
      create_error.push(result.data);
    }
  }
  return {
    error: create_error.length > 0 ? true : false,
    create_success,
    create_error,
    message: "Create multiple user success",
  };
};

const update_user_by_id = async (id, data) => {
  try {
    const filter = { _id: id };
    const result = await User.findOneAndUpdate(filter, data);
    return {
      error: false,
      data: result,
      message: "Update user by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Update user by id failed",
    };
  }
};

const delete_single_user_by_id = async (id) => {
  try {
    const filter = { _id: id };
    const result = await User.findOneAndUpdate(filter, {
      deleted: true,
    });
    return {
      error: false,
      data: result,
      message: "Delete single user by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Delete single user by id failed",
    };
  }
};

const delete_multiple_user_by_id = async (data_array_user_id) => {
  let delete_success = [];
  let delete_error = [];
  for (const [index] of data_array_user_id.entries()) {
    const result = await delete_single_user_by_id(data_array_user_id[index]);
    if (result.error === false) {
      delete_success.push(result.data);
    } else {
      delete_error.push(result.data);
    }
  }
  return {
    error: delete_error.length > 0 ? true : false,
    delete_success,
    delete_error,
    message: "Delete multiple customer by id failed",
  };
};

const undelete_single_user_by_id = async (id) => {
  try {
    const filter = { _id: id };
    await User.restore(filter);
    const result = await User.findOneAndUpdate(filter, {
      deleted: false,
    });
    return {
      error: false,
      data: result,
      message: "Undelete single user by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Undelete single user by id failed",
    };
  }
};

const undelete_multiple_user_by_id = async (data_array_user_id) => {
  let undelete_success = [];
  let undelete_error = [];
  for (const [index] of data_array_user_id.entries()) {
    const result = await undelete_single_user_by_id(
      data_array_user_id[index].id
    );
    if (result.error === false) {
      undelete_success.push(result.data);
    } else {
      undelete_error.push(result.data);
    }
  }
  return {
    error: undelete_error.length > 0 ? true : false,
    undelete_success,
    undelete_error,
    message: "Undelete multiple customer by id failed",
  };
};

module.exports = {
  get_all_user,
  get_user_by_id,
  create_single_user,
  create_multiple_user,
  update_user_by_id,
  delete_single_user_by_id,
  delete_multiple_user_by_id,
  undelete_single_user_by_id,
  undelete_multiple_user_by_id,
};
