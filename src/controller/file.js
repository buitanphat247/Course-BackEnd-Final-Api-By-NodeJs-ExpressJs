const {
  upload_single_file,
  upload_multiple_file,
} = require("../service/FileUpload");

module.exports = {
  post_file: async (req, res) => {
    let result;
    if (req.body.type === "upload_single_file") {
      result = await upload_single_file(req.files.file);
    } else {
      let file_array = [];
      Array.isArray(req.files.file)
        ? req.files.file.map((item) => file_array.push(item))
        : file_array.push(req.files.file);

      result = await upload_multiple_file(file_array);
    }
    res.send(result);
  },
};
