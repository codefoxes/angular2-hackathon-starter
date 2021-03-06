'use strict';

const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
  name:     { type: String, required: true },
  username: { type: String, required: true, index: true, unique: true },
  email:    { type: String, required: true, index: true, unique: true },
  phone:    { type: Number, index: true, unique: true, sparse: true },
  password: { type: String, required: true },
  role:     { type: String, required: true },
  status:   { type: Boolean, default: false },
  created:  { type: Date, required: true },
  updated:  { type: Date, default: Date.now },
  verification: {
    email: Boolean,
    phone: Boolean,
  },
});

module.exports = mongoose.model('User', userSchema);
