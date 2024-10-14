const mongoose = require('mongoose');
//const bcrypt = require('bcrypt'); // For password hashing (assuming you're using bcrypt)

const userSchema = new mongoose.Schema({
  fullname: {
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
  // Add other user fields if needed
}, { timestamps: true }); // Add timestamps for created_at and updated_at

// Hash password before saving the user
// userSchema.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.models.User || mongoose.model('User', userSchema) ;
 