const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    console.log("req.body", req.body);
    if (!email) {
      throw new error("please provide email");
    }
    if (!name) {
      throw new error("please provide name");
    }
    if (!password) {
      throw new error("please provide password");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new error("Something is wrong");
    }

    const playload = {
      ...req.body,
      password: hashPassword,
    };

    const userData = userModel(playload);
    const saveUser = userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Succesfully",
    });
  } catch (err) {
    res.json({
      message: err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
