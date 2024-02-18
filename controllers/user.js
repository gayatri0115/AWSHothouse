const User = require("../models/user");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    const user=await User.findOne({ where: {email: email}});
    if(user){
      return res
         .status(403)
         .json({success: false, message: "User already exists."});
    }
    const result = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email,
      mobilenumber: mobileNumber,
      password: password,
    });

    return res
      .status(201)
      .json({ success: true, message: "User registration successful", result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    if (user.dataValues.password != password) {
      return res
        .status(401)
        .json({ success: false, message: "Password not matching." });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Login Successful." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

module.exports = { register, login };