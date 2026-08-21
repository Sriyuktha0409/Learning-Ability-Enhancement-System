const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  grade: { type: Number, required: true },
  school: { type: String },
  tests: [{
    testType: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    details: { type: Object }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);