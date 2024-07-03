const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connection = async () => {
  const url = process.env.db_url;

  const option = {
    /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    dbName: process.env.db_name,
    /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    user: process.env.db_username,
    /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
    pass: process.env.db_password,
  };

  var dbState = [
    {
      value: 0,
      label: "disconnected",
    },
    {
      value: 1,
      label: "connected",
    },
    {
      value: 2,
      label: "connecting",
    },
    {
      value: 3,
      label: "disconnecting",
    },
  ];

  try {
    await mongoose.connect(url, option);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value == state).label, "to db");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connection;
