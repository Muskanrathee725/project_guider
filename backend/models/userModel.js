const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // --- YEH NAYA HAI ---
    techStack: {
      type: String,
      default: null, // User ne abhi select nahi kiya
    },
    skillLevel: {
      type: String,
      default: null, // e.g., 'zero', 'basic', 'medium'
    },
    surveyCompleted: {
      type: Boolean,
      default: false, // Default false, jab tak survey na bhare
    },
    // --- YAHAN TAK ---
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;