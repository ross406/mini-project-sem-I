const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (user_id, is_admin) => {
  const payload = {
    user: {
      id: user_id,
      isAdmin: is_admin,
    },
  };

  //the code below was the code written from the tutorial
  //Look at file server/routes/dashboard.js to see the change code for this code

  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "30d" });
};

const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

module.exports = {
  parseJwt: parseJwt,
  jwtGenerator: jwtGenerator,
};
