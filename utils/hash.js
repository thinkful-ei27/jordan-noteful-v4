'use strict';

const bcrypt = require('bcryptjs');
const password = 'baseball';

bcrypt.hash(password, 10)
  .then(digest => {
    console.log('digest = ', digest);
    return digest;
  })
  .then(hash => {
    return bcrypt.compare(password, hash);
  })
  .then( valid => {
    console.log('isValed: ', valid);
  })
  .catch(err => {
    console.error(err);
  });