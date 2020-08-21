const jwt = require('jsonwebtoken');

module.exports = class TokenHandler {
  constructor (secret = '123') {
    this.secret = secret;
  }

  sign (payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, (err, token) => {
        return err ? reject(err) : resolve(token);
      });
    });
  }

  verify (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, payload) => {
        return err ? reject(err) : resolve(payload);
      });
    });
  }
};
