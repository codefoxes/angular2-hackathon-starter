'use strict';

class ValidationController{

  /**
   * Validate new user data.
   */
  static newUser(data) {
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
}

module.exports = ValidationController;
