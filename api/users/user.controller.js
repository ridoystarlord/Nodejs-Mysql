const {create,allUsers,updateUser,singleUserById,loginWithEmail} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const createUser= (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  create(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 502,
        message: "Database connection errror"
      });
    }
    return res.status(200).json({
      success: 200,
      message: "User Created successfully"
    });
  });
}
const getAllUsers= (req, res) => {
  allUsers((err, results) => {
    if (err) {
      return res.status(500).json({
        success: 502,
        message: "Database connection errror"
      });
    }
    return res.status(200).json({
      success: 200,
      result: results
    });
  });
}
const getUserById= (req, res) => {
  const id=req.params.id
  singleUserById(id,(err, results) => {
    if (err) {
      return res.status(500).json({
        success: 502,
        message: "Database connection errror"
      });
    }
    return res.status(200).json({
      success: 200,
      result: results
    });
  });
}
const modifyUser= (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  updateUser(body,(err, results) => {
    if (err) {
      return res.status(500).json({
        success: 502,
        message: "Database connection errror"
      });
    }
    return res.status(200).json({
      success: 200,
      message: "Modify User Successfully"
    });
  });
}
const loginUser= (req, res) => {
  const body = req.body;
  loginWithEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      return res.json({
        success: 401,
        message: "Invalid email or password"
      });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
        expiresIn: "1h"
      });
      return res.json({
        success: 200,
        message: "Login successfully",
        token: jsontoken
      });
    } else {
      return res.json({
        success: 401,
        message: "Invalid email or password"
      });
    }
  });
}

  module.exports={
    createUser,
    getAllUsers,
    modifyUser,
    getUserById,
    loginUser
  }