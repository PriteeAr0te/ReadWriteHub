const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../middleware/authentication");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET || "youare@verrypretty";

const sendVeryfyMAil = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: "arotepritee111@gmail.com",
        pass: "kettokrjndangiyy",
      },
      connectionTimeout: 10 * 1000,
      greetingTimeout: 10 * 1000,
      socketTimeout: 10 * 1000,
    });

    const mailOptions = {
      from: "arotepritee111@gmail.com",
      to: email,
      subject: "Verification Email",
      html:
        "<p>Hii " +
        name +
        ' please click here to <a href= "http://localhost:3000/verify?id=' +
        user_id +
        '"> Verify </a> Your mail.</p>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been send: ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//varify mail and redirect
const verifyMail = async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { verified: true } }
    );
    console.log(updateInfo);

    // Send a response to redirect the user to the desired page accordint to the userType
      if (user.userType === "reader") {
        return res.redirect("/verify?userType=reader");
      } else if (user.userType === "author") {
        return res.redirect("/verify?userType=author");
      } else {
        return res.redirect("/verify?userType=login");
      }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Route1: to register a user(author, reader): localhost:5000/api/auth/register
router.post(
  "/register",
  [
    body("name", "Enter Your Name").isLength({ min: 2 }),
    body("email", "Enter mail").isEmail(),
    body("password", "Password must be greater than 5 characters").isLength({
      min: 5,
    }),
    body("confirmPassword", "passwords do not match").custom(
      (value, { req }) => {
        if (value != req.body.password) {
          throw new error("Passwords does not match");
        }
        return true;
      }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "User with this email already exists" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        userType: req.body.userType,
        password: hashPass,
      });

      const userData = await user.save();

      if (userData) {
        sendVeryfyMAil(req.body.name, req.body.email, userData._id);
      }

      const data = {
        user: {
          id: user.id,
          userType: user.userType,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ authtoken });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

//Route2 : Login User= localhost:5000/api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter Valid Mail").isEmail(),
    body("password", "Enter Valid Password").exists({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Please enter valid email" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ msg: "Invalid Password" });
      }

      const data = {
        user: {
          id: user.id,
          userType: user.userType,
        },
      };
      console.log(data);
      const authtoken = jwt.sign(data, JWT_SECRET);

      return res.json({
        authtoken: authtoken,
        user: user,
        msg: "Login Successfull",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal server Error" });
    }
  }
);

//Route3 : for authorised User= localhost:5000/api/auth/getuser

router.get("/getuser", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    // Fetch user details based on userType
    const user = await User.findOne({ _id: userId, userType: req.userType });
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user, message: "Successfully fetched user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/verify", verifyMail);

module.exports = { router, verifyMail };
