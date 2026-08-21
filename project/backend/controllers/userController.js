const User = require('../models/User');

exports.saveUser = async (req, res) => {
  const { name, age, email, phone, grade, school } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, age, phone, grade, school },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    
    res.json({ 
      success: true,
      message: "User details processed successfully!",
      user 
    });
  } catch (error) {
    console.error("Error saving user details:", error);
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      res.status(500).json({ success: false, message: "Failed to process user details" });
    }
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user data" });
  }
};