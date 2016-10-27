'use strict';

const bcrypt   = require('bcryptjs');
const User     = require('../models/user');
const validate = require('./validations');

class UserController {

  /**
   * Index all users.
   */
  static get(req, res) {
    if (req.user.role !== 'admin') {
      res.json({ success: false, message: `Sorry. Doesn't exist` });
      return;
    }

    User.find({}, '-password', (err, u) => {
      if (err) {
        res.json({ message: err });
      }

      res.json({ users: u });
    });
  };

  static me(req, res) {
    res.json({user: req.user});
  }

  /**
   * Validate new user data.
   */
  static validate(data) {
    let errors = [];
    if (!data.name) {
      errors.push('Name is required.');
    }

    if (!data.email && !data.phone) {
      errors.push('Username or Email is required.');
    }

    if (!data.password) {
      errors.push('Password is required.');
    }

    if (data.email) {
      let emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = emailRegx.test(data.email);
      if (!result) {
        errors.push('Please provide correct Email address.');
      }
    }

    if (data.username) {
      let nameRegex = /^[a-zA-Z0-9]+$/;
      let result = nameRegex.test(data.username);
      if (!result) {
        errors.push('Username can only contain alphanumeric characters.');
      }
    }

    return errors;
  }

  /**
   * Create user.
   * @param {object} data - User object.
   * @param {object} res - Response Handler.
   * @returns {Promise} - New user promise.
   */
  static createUser(data, res) {
    if (data.role === 'admin') {
      return new Promise((resolve, reject) => {
        reject('Get out!');
      });
    }

    let errors = validate.newUser(data);
    if (errors.length > 0) {
      return new Promise((reolve, reject) => {
        reject({ message: errors });
      });
    } else {
      // Generate password hash.
      let password = bcrypt.hashSync(data.password, 8);

      // Create and save user.
      let user = new User({
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: password,
        role: data.role,
        status: data.status,
        created: Date.now(),
      });

      return user.save();
    }
  }

  /**
   * Create user from router.
   * @todo Handle Errors.
   */
  static create(req, res) {
    let newUser = UserController.createUser(req.body, res);
    newUser.then((u) => {
      delete u._doc.password;
      res.json({ user: u });
    }).catch((err) => {
      res.json({ success: false, message: 'Could not create user.' });
    });
  }
}

module.exports = UserController;
