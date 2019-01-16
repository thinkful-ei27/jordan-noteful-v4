'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');


const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);
const jwAuth = passport.authenticate('jwt', { session: false, failWithError: true });

function createAuthToken(user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/login', localAuth, function (req, res) {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

router.post('/refresh', jwAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;