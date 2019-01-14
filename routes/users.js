'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/user');

const router = express.Router();

router.post('/', (req, res, next) => {
  const { username, fullname, password } = req.body;
  const user = {username, fullname, password};

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing ${missingField} in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ['username', 'password', 'fullname'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    const err = new Error(`${nonStringField} must be a string`);
    err.status = 422;
    return next(err);
  }

  const trimmedFields = ['username', 'password'];
  const nonTrimmedField = trimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    const err = new Error(`${nonTrimmedField} cannot start or end with whitespace`);
    err.status = 422;
    return next(err);
  }

  const fieldSizes = {
    username: {
      min: 1,
      max: 72
    },
    password: {
      min: 8,
      max: 72
    },
    fullname: {
      max: 72
    }
  };

  const fieldTooShort = Object.keys(fieldSizes).find(
    field => 'min' in fieldSizes[field] && req.body[field].trim().length < fieldSizes[field].min
  );

  if (fieldTooShort) {
    const err = new Error(`${fieldTooShort} must be at least ${fieldSizes[fieldTooShort].min} characters long`);
    err.status = 422;
    return next(err);
  }

  const fieldTooLong = Object.keys(fieldSizes).find(
    field => 'max' in fieldSizes[field] && req.body[field].trim().length > fieldSizes[field].max
  );

  if (fieldTooLong) {
    const err = new Error(`${fieldTooLong} cannot be longer than ${fieldSizes[fieldTooLong].max} characters long`);
    err.status = 422;
    return next(err);
  }

  // if (!user.username || !user.password) {
  //   const err = new Error('Missing required field');
  //   err.status = 400;
  //   return next(err);
  // }

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname
      };
      return User.create(newUser);
    })
    .then(result => {
      res.status(201)
        .location(`http://${req.headers.host}/api/users/${result.id}`)
        .json(result);
    })
    .catch(err => {
      if(err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;