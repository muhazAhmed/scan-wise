const admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const valid = require("../utils/validator");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const twilio = require("twilio");

// const client = twilio(process.env.accountSid, process.env.authToken);

// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// const sendOTP = async (phone, otp) => {
//   try {
//     await client.messages.create({
//       body: `Your OTP for verification is: ${otp}, and valid for 3 minutes`,
//       from: process.env.twilioPhoneNumber,
//       to: phone,
//     });
//     console.log(`OTP sent to ${phone}`);
//   } catch (error) {
//     console.error("Failed to send OTP:", error.message);
//   }
// };

//=========== Register admin ==================
const register = async (req, res) => {
  try {
    let data = req.body;
    let { firstname, lastname, email, phone, password, confirmPassword } = data;

    // ============= Only 1 admin data can be present in DB ===============
    let checkIfAdminAvailable = await admin.find()
    if (checkIfAdminAvailable.length === 1){
      return res.status(400).json("Admin aldready registered, either delete existing or login");
    }
    
    // ============= Name validation ================
    if (!firstname) {
      return res.status(400).json("Please enter first name");
    }
    if (!lastname) {
      return res.status(400).json("Please enter last name");
    }

    //==================> Email validation <=======================
    if (!email) {
      return res.status(400).json("Please enter email");
    }
    if (!valid.isValidEmail(email)) {
      return res.status(400).json("Email is invalid");
    }

    //<===================
    let checkEmail = await admin.findOne({ email });
    if (checkEmail) {
      return res.status(400).json("Email already registered");
    }

    //==================> Phone validation <=======================
    // req.body.phone = "+" + req.body.phone.replace(/\D/g, "");
    if (!phone) {
      return res.status(400).json("Please enter phone number");
    }

    if (!valid.isValidMobile(phone)) {
      return res.status(400).json("Phone number is invalid");
    }

    //<===================
    const dublicatePhone = await admin.findOne({ phone });
    if (dublicatePhone) {
      return res.status(400).json("Number Already Exists");
    }

    //==================> password validation <=======================
    if (!password) {
      return res.status(400).json("Please enter password");
    }
    if (!valid.isValidPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must have at least 1 uppercase, 1 lowercase, 1 special character, 1 number and must consist of at least 8 characters."
        );
    }

    if(!confirmPassword){
        return res.status(400).json("Please enter confirm password");
    }

    if(password != confirmPassword){
        return res.status(400).json("Password is not matching")
    }

    // Generate OTP and set expiration time (e.g., 5 minutes from now)
    // const otp = generateOTP();
    // const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);

    // Save OTP and OTP expiration time to the user document
    // data.otp = otp;
    // data.otpExpiresAt = otpExpiresAt;

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const savedData = await admin.create(data);
    // Send the OTP to the user's phone number
    // await sendOTP(phone, otp);

    return res.status(201).json({ data: savedData, message: "Registration Successfull" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> Login admin <=======================

const login = async function (req, res) {
  try {
    let data = req.body;
    const { email, password, isAdmin } = data;
    data.isAdmin = true;

    if (!email) {
      return res.status(400).json("Please enter email address");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }

    let getAdmin = await admin.findOne({ email });
    if (!getAdmin)
      return res.status(401).json("Email or Password is incorrect.");

    let matchPassword = await bcrypt.compare(password, getAdmin.password);
    if (!matchPassword)
      return res.status(401).json("Email or Password is incorrect.");

    //token
    const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds
    const token = jwt.sign(
      {
        userId: getAdmin._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: oneDayInSeconds }
    );

    const { newPassword, ...other } = getAdmin;
    let User = getAdmin;

    return res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: oneDayInSeconds * 1000, // maxAge expects milliseconds
      }).status(200).json({message : "Login Successfull", User, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> Update admin <=======================
const updateAdmin = async (req, res) => {
  try {
    let data = req.body;
    const { firstname, lastname, email, phone, password, profile } = data;

    if (email) {
      if (!valid.isValidEmail(email)) {
        return res.status(400).json("Email is invalid");
      }
    }

    if (phone) {
      if (!valid.isValidMobile(phone)) {
        return res.status(400).json("Phone number is invalid");
      }
    }

    if (password) {
      if (!valid.isValidPassword(password)) {
        return res
          .status(400)
          .json(
            "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
          );
      }

      //========= Hashing the password =========
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await admin.updateOne({ _id: req.params.id }, { $set: data });
    return res.status(200).json("Profile has been updated successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//==================> Logout user <=======================
const logout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json("You have been logged out.");
};

//==================> Delete admin <=======================
const deleteAdmin = async (req, res) => {
  try {
    const deletedAdmin = await admin.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedAdmin);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//==================> fetch admin <=======================
const fetchAdmin = async (req, res) => {
  try {
    let getData = await admin.findById({ _id: req.params.id });
    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteAdmin,
  updateAdmin,
  fetchAdmin,
};