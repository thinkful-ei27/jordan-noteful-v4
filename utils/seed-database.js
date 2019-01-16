'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const Note = require('../models/note');
const Folder = require('../models/folder');
const Tag = require('../models/tag');
const User = require('../models/user');

const { folders, notes, tags, users } = require('../db/data');

console.log(`Connecting to mongodb at ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex : true })
  .then(() => {
    console.info('Deleting Data...');
    return Promise.all([
      Note.deleteMany(),
      Folder.deleteMany(),
      Tag.deleteMany(),
      User.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      Folder.insertMany(folders),
      Tag.insertMany(tags),
      User.insertMany(users),
      Note.insertMany(notes),
    ]);
  })
  .then(results => {
    // tags folders users notes
    console.info(`Inserted ${results[0].length} Tags`);
    console.info(`Inserted ${results[1].length} Folders`);
    console.info(`Inserted ${results[2].length} Users`);
    console.info(`Inserted ${results[3].length} Notes`);
    console.info('Disconnecting...');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
