const path = require("path");
const fs = require("fs");

function renameAndSanitizeImage(fileName) {
  // Lấy ngày tháng năm giờ phút giây mili giây hiện tại
  const now = new Date();
  const formattedDate = `${now.getFullYear()}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
    now.getHours()
  ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
    now.getSeconds()
  ).padStart(2, "0")}${String(now.getMilliseconds()).padStart(3, "0")}`;

  // Lấy phần mở rộng của tệp
  const ext = path.extname(fileName);

  // Tạo tên tệp mới chỉ bao gồm ngày tháng năm giờ phút giây mili giây hiện tại
  return `${formattedDate}${ext}`;
}

const upload_single_file = async (fileDetail) => {
  const imageFile = fileDetail;
  const uploadsDir = path.join(__dirname, "../", "public/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const rename_image = renameAndSanitizeImage(imageFile.name);
  const uploadPath =
    path.join(__dirname, "../", "public/uploads/") + rename_image;
  try {
    await imageFile.mv(uploadPath);
    return {
      error: false,
      path: uploadPath,
      message: "Upload file success",
    };
  } catch (error) {
    return {
      error: true,
      path: null,
      message: "Upload file failed",
    };
  }
};

const upload_multiple_file = async (fileArray) => {
  let count_success = 0;
  let path = [];
  let count_error = 0;
  for (const [index] of fileArray.entries()) {
    const result = await upload_single_file(fileArray[index]);
    if (result.error === false) {
      count_success++;
      path.push(result.path);
    } else {
      count_error++;
    }
  }
  return {
    error: count_error === 0 ? false : true,
    success: count_success,
    path: path,
    failed: count_error,
  };
};

module.exports = { upload_single_file, upload_multiple_file };
