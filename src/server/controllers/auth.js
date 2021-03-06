'use strict';

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/user');
const users  = require('./users');

class AuthController{

  /**
   * Logs in a user
   * @param {object} req - Request Handler.
   * @param {object} res - Response Handler.
   * @param {object} user - New User Object.
   */
  static loginUser(req, res, user) {
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      bcrypt.compare(req.body.password, user.password, function(err, auth) {
        if (auth) {
          // if user is found and password is right create a token.
          let token = jwt.sign({user: user.username}, req.app.get('superSecret'), {
            // expires in 24 hours
            expiresIn: 86400,
          });

          // Set response cookie.
          res.cookie('XSRF-TOKEN', token);
          // return the information including token as JSON
          res.json({
            success: true,
            name: user.name,
            email: user.email,
            role: user.role,
            message: 'Logged in!',
            token: token,
          });
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  }

  /**
   * Log in a user from router.
   */
  static login(req, res) {

    // find the user
    User.findOne({
      $or: [{username: req.body.username}, {email: req.body.username}],
    }, (err, user) => {
      if (err) {
        res.json({ success: false, message: 'Could not find user.' });
      }

      AuthController.loginUser(req, res, user);
    });
  };

  /**
   * Sign up a new user.
   */
  static signup(req, res) {
    let newUser = users.createUser(req.body, res);
    newUser.then((user) => {
      AuthController.loginUser(req, res, user);
    }).catch((err) => {
      let message = (err.message) ? err.message : 'Please try again.';
      res.json({ success: false, message: message });
    });
  }

  /**
   * Check user authentication.
   */
  static authenticate(req, res, next) {
    // check header or url parameters or post parameters for token.
    let token = req.body.token || req.query.token || req.headers['x-xsrf-token'];

    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          User.findOne({
            username: decoded.user,
          }, '-password', (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Could not find user.' });
            }
            req.user = user;
            next();
          });
        }
      });
    } else {
      // If there is no token return error.
      return res.status(403).send({
        success: false,
        message: 'Private resource.',
      });
    }
  }
}

module.exports = AuthController;
