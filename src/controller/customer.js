const {
  get_customer_by_id,
  get_all_customer,
  create_single_customer,
  create_multiple_customer,
  update_customer_by_id,
  delete_single_customer_by_id,
  delete_multiple_customer_by_id,
  undelete_single_customer_by_id,
  undelete_multiple_customer_by_id,
} = require("../service/service.customer");

module.exports = {
  get_customer: async (req, res) => {
    let result;
    if (req.body.type === "get_all_customer") {
      result = await get_all_customer();
    } else if (req.body.type === "get_customer_by_id") {
      result = await get_customer_by_id(req.body.id);
    }
    res.send(result);
  },
  post_customer: async (req, res) => {
    let result;
    if (req.body.type === "create_single_customer") {
      const infor_customer = req.body;
      const file_image = req.files?.image && req.files.image;
      result = await create_single_customer(
        ({ username, email, phone, age, address, description } =
          infor_customer),
        file_image
      );
    } else if (req.body.type === "create_multiple_customer") {
      let image_array = [];
      req.files?.image && Array.isArray(req.files.image)
        ? req.files.image.map((item) => image_array.push(item))
        : image_array.push(req.files.image);
      console.log("image_array: ", image_array);
      result = await create_multiple_customer(req.body.user_array, image_array);
    }
    res.send(result);
  },
  put_customer: async (req, res) => {
    const file_image_new = req.files?.image && req.files.image;
    const result = await update_customer_by_id(
      req.body.id,
      ({ username, email, phone, age, address, description } = req.body),
      file_image_new
    );
    res.send(result);
  },
  delete_customer: async (req, res) => {
    let result;
    if (req.body.type === "delete_single_customer_by_id") {
      result = await delete_single_customer_by_id(req.body.id);
    } else {
      result = await delete_multiple_customer_by_id(req.body.id_customer_array);
    }
    res.send(result);
  },
  undelete_customer: async (req, res) => {
    let result;
    if (req.body.type === "undelete_single_customer_by_id") {
      result = await undelete_single_customer_by_id(req.body.id);
    } else {
      result = await undelete_multiple_customer_by_id(
        req.body.id_customer_array
      );
    }
    res.send(result);
  },
};
