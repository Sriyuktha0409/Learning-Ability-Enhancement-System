require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with debugging
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  console.log('📌 Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// User Schema with strict validation
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  age: { type: Number, min: [5, 'Age must be at least 5'], max: [18, 'Age must be at most 18'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    validate: {
      validator: v => /^\S+@\S+\.\S+$/.test(v),
      message: 'Please enter a valid email'
    }
  },
  phone: { 
    type: String, 
    validate: {
      validator: v => /^[0-9]{10}$/.test(v),
      message: 'Phone must be 10 digits'
    }
  },
  grade: { 
    type: String, 
    required: [true, 'Grade is required'], 
    enum: {
      values: ['1', '2', '3', '4', '5', '6', '7'],
      message: 'Grade must be between 1 and 7'
    }
  },
  school: { type: String, required: [true, 'School is required'] },
  testResults: [{
    testType: { type: String, required: [true, 'Test type is required'] },
    score: { 
      type: Number, 
      required: [true, 'Score is required'],
      min: [0, 'Score cannot be negative']
    },
    details: {
      totalQuestions: { 
        type: Number, 
        required: [true, 'Total questions is required'],
        min: [1, 'Must have at least 1 question']
      },
      correctAnswers: { 
        type: Number, 
        required: [true, 'Correct answers is required'],
        min: [0, 'Correct answers cannot be negative']
      },
      percentage: { 
        type: Number, 
        required: [true, 'Percentage is required'],
        min: [0, 'Percentage cannot be negative'],
        max: [100, 'Percentage cannot exceed 100']
      },
      timeTaken: { 
        type: Number, 
        required: [true, 'Time taken is required'],
        min: [0, 'Time taken cannot be negative']
      },
      date: { 
        type: Date, 
        required: [true, 'Date is required'],
        default: Date.now
      }
    }
  }]
}, { 
  timestamps: true,
  strict: 'throw' // Throw errors for unknown fields
});

const User = mongoose.model('User', userSchema);

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  console.log(`Health check - DB status: ${dbStatus}`);
  res.status(200).json({ 
    status: 'healthy',
    database: dbStatus,
    timestamp: new Date()
  });
});

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    console.log('Registration attempt for:', req.body.email);
    const user = new User(req.body);
    await user.save();
    console.log('✅ User registered:', user.email);
    
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        grade: user.grade
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    let status = 500;
    let message = 'Registration failed';
    
    if (error.name === 'ValidationError') {
      status = 400;
      message = Object.values(error.errors).map(e => e.message).join(', ');
    } else if (error.code === 11000) {
      status = 409;
      message = 'Email already registered';
    }
    
    res.status(status).json({ success: false, message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Login attempt for:', email);
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log('✅ User logged in:', user.email);
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        grade: user.grade,
        testResults: user.testResults || []
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed' 
    });
  }
});

// Save Test Results (Enhanced with debugging)
app.post('/api/save-test-result', async (req, res) => {
  try {
    console.log('📝 Attempting to save test result...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { email, testType, score, details } = req.body;
    
    // Validate required fields
    if (!email) throw new Error('Email is required');
    if (!testType) throw new Error('Test type is required');
    if (score === undefined || score === null) throw new Error('Score is required');
    if (!details) throw new Error('Details are required');
    
    // Prepare test result data
    const testResult = {
      testType,
      score: Number(score),
      details: {
        totalQuestions: Number(details.totalQuestions) || 25,
        correctAnswers: Number(details.correctAnswers) || Number(score),
        percentage: Math.round(((details.correctAnswers || score) / (details.totalQuestions || 25)) * 100),
        timeTaken: Number(details.timeTaken) || 0,
        date: details.date ? new Date(details.date) : new Date()
      }
    };
    
    console.log('📊 Prepared test result:', JSON.stringify(testResult, null, 2));

    // Update user document
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { testResults: testResult } },
      { new: true, runValidators: true }
    );

    if (!user) {
      console.log('❌ User not found for test result:', email);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const savedResult = user.testResults[user.testResults.length - 1];
    console.log('✅ Test result saved successfully:', JSON.stringify(savedResult, null, 2));
    
    res.status(201).json({
      success: true,
      testResult: savedResult
    });
  } catch (error) {
    console.error('❌ Failed to save test result:', error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to save test result' 
    });
  }
});

// Get User Data
app.get('/api/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Fetching user data for:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log('✅ Retrieved user data for:', user.email);
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        grade: user.grade,
        testResults: user.testResults || []
      }
    });
  } catch (error) {
    console.error('❌ Failed to fetch user:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user data' 
    });
  }
});

// Error handlers
app.use((req, res) => {
  console.log('❌ Endpoint not found:', req.method, req.path);
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`🔗 Endpoints:`);
  console.log(`   POST /api/register - Register new user`);
  console.log(`   POST /api/login - Login existing user`);
  console.log(`   POST /api/save-test-result - Save test results`);
  console.log(`   GET /api/user/:email - Get user data\n`);
});