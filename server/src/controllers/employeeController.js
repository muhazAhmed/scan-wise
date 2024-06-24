const employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const valid = require("../utils/validator");
const bcrypt = require("bcrypt");

const register = async(req, res) => {
    try {
        let data = req.body;
        let {username, password, confirmPassword} = data;

        // ============= Only 1 employee data can be present in DB ===============
        let checkIfEmpAvailable = await employee.find()
        if (checkIfEmpAvailable.length === 1){
            return res.status(400).json("Employee already registered, either delete existing or login");
        }

        if (!username) {
            return res.status(400).json("Please enter a username");
        }

        if (!password) {
            return res.status(400).json("Please enter a password");
        }

        if (!confirmPassword) {
            return res.status(400).json("Please enter confirm password");
        }

        if (password != confirmPassword) {
            return res.status(400).json("Password is not matching");
        }

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        let saveData = await employee.create(data)
        return res.status(200).json({message : "Registration Successful", saveData})
        
    } catch (error) {
        return res.status(500).json(error);
    }
}
const login = async(req, res) => {
    try {
        let data = req.body;
    const { username, password } = data;

    if (!username) {
      return res.status(400).json("Please enter username");
    }

    if (!password) {
      return res.status(400).json("Please enter password");
    }

    let getEmp = await employee.findOne({ username });
    if (!getEmp)
      return res.status(401).json("username or Password is incorrect.");

    let matchPassword = await bcrypt.compare(password, getEmp.password);
    if (!matchPassword)
      return res.status(401).json("username or Password is incorrect.");

    //token
    const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds
    const token = jwt.sign(
      {
        userId: getEmp._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: oneDayInSeconds }
    );

    const { newPassword, ...other } = getEmp;
    let User = getEmp;

    return res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: oneDayInSeconds * 1000, // maxAge expects milliseconds
      }).status(200).json({message : "Login Successfull", User, token });
    } catch (error) {
        return res.status(500).json(error);
    }
}
const deleteEmp = async(req, res) => {
    try {
        const deletedEmp = await employee.deleteOne({ _id: req.params.id });
        return res.status(200).json(deletedEmp);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const logout = async(req, res) => {
    try {
        return res.clearCookie("access_token", { sameSite: "none", secure: true })
        .status(200).json("You have been logged out.");
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {register, login, logout, deleteEmp}