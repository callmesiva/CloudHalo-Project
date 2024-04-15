const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginModel = require("../../models/loginModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginModel.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "User registered successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await loginModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new loginModel({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
