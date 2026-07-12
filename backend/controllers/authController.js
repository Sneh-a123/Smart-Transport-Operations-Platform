const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const emailLower = email.trim().toLowerCase();

    const userExists = await User.findOne({
      email: emailLower,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: emailLower,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration Successful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    // ===========================
    // Fixed Admin Login
    // ===========================
    if (
      email === "admin@transitops.com" &&
      password === "Admin@123"
    ) {
      const admin = {
        _id: "admin",
        fullName: "Administrator",
        email: "admin@transitops.com",
        role: "admin",
      };

      const token = jwt.sign(
        {
          id: admin._id,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Admin Login Successful",
        token,
        user: admin,
      });
    }

    // ===========================
    // Database User Login
    // ===========================
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
        message: err.message,
        error: err
    });
}
};