const Customer = require("../models/customer_model");
const { upload_single_file } = require("./FileUpload");

const get_all_customer = async () => {
  try {
    const user_result = await Customer.find({});
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

const get_customer_by_id = async (id) => {
  try {
    const data_customer_of_id = await Customer.findById(id);
    return {
      error: false,
      data: data_customer_of_id,
      message: "Get customer by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Get customer by id failed",
    };
  }
};

const create_single_customer = async (
  data_customer,
  file_image_data = null
) => {
  try {
    const image =
      file_image_data !== null
        ? (await upload_single_file(file_image_data)).path
        : "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";
    const { username, email, phone, age, address, description } = data_customer;
    const result = await new Customer({
      username,
      email,
      phone,
      age,
      address,
      description,
      image,
    }).save();
    return {
      error: false,
      data: result,
      message: "Create customer success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Create customer failed",
    };
  }
};

const create_multiple_customer = async (data_customers, files_data) => {
  const data_array_customer = JSON.parse(data_customers);
  let create_success = [];
  let create_error = [];
  for (const [index] of data_array_customer.entries()) {
    const result = await create_single_customer(
      data_array_customer[index],
      files_data[index]
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
    message: "Create multiple customer success",
  };
};

const update_customer_by_id = async (id, data, file_image_new = null) => {
  try {
    const path_image_current = (await get_customer_by_id(id)).data.image;
    const image =
      file_image_new !== null
        ? (await upload_single_file(file_image_new)).path
        : path_image_current;
    const { username, email, phone, age, address, description } = data;
    const filter = { _id: id };
    const result = await Customer.findOneAndUpdate(filter, {
      username,
      email,
      phone,
      age,
      address,
      description,
      image,
    });
    return {
      error: false,
      data: result,
      message: "Update customer by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Update customer by id failed",
    };
  }
};

const delete_single_customer_by_id = async (id) => {
  try {
    const filter = { _id: id };
    const result = await Customer.findOneAndUpdate(filter, {
      deleted: true,
    });
    return {
      error: false,
      data: result,
      message: "Delete single customer by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Delete single customer by id failed",
    };
  }
};

const delete_multiple_customer_by_id = async (data_array_customer_id) => {
  let delete_success = [];
  let delete_error = [];
  for (const [index] of data_array_customer_id.entries()) {
    const result = await delete_customer_by_id(
      data_array_customer_id[index].id
    );
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

const undelete_single_customer_by_id = async (id) => {
  try {
    const filter = { _id: id };
    await Customer.restore(filter);
    const result = await Customer.findOneAndUpdate(filter, {
      deleted: false,
    });
    return {
      error: false,
      data: result,
      message: "Undelete single customer by id success",
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      message: "Undelete single customer by id failed",
    };
  }
};

const undelete_multiple_customer_by_id = async (data_array_customer_id) => {
  let undelete_success = [];
  let undelete_error = [];
  for (const [index] of data_array_customer_id.entries()) {
    const result = await undelete_single_customer_by_id(
      data_array_customer_id[index].id
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
  get_all_customer,
  get_customer_by_id,
  create_single_customer,
  create_multiple_customer,
  update_customer_by_id,
  delete_single_customer_by_id,
  delete_multiple_customer_by_id,
  undelete_single_customer_by_id,
  undelete_multiple_customer_by_id,
};
