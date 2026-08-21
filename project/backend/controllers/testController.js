const User = require('../models/User');

exports.saveTestResult = async (req, res) => {
  const { email, testType, score, details } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { 
        $push: { 
          tests: { 
            testType, 
            score, 
            details 
          } 
        } 
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.json({ 
      success: true,
      message: "Test results saved successfully!",
      user 
    });
  } catch (error) {
    console.error("Error saving test results:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to save test results",
      error: error.message 
    });
  }
};