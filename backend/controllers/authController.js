const User = require("../models/User");

// Функция регистрации
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Функция логина (пустая для теста)
const login = async (req, res) => {
  res.status(200).json({ message: "Login endpoint" });
};

module.exports = { register, login };
