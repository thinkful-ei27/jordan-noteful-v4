
'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_MONGODB_URI } = require('../config');

const User = require('../models/user');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Noteful API - Users', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  const fullname = 'Example User';

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
      .then(() => User.deleteMany());
  });

  beforeEach(function () {
    return User.createIndexes();
  });

  afterEach(function () {
    return User.deleteMany();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('POST /api/users', function () {

    it('Should create a new user', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({ username, password, fullname })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('id', 'username', 'fullname', 'createdAt', 'updatedAt');
          expect(res.body.id).to.exist;
          expect(res.body.username).to.equal(username.toLowerCase());
          expect(res.body.fullname).to.equal(fullname);
          return User.findOne({ username });
        })
        .then(user => {
          expect(user).to.exist;
          expect(user.id).to.equal(res.body.id);
          expect(user.fullname).to.equal(fullname);
          return user.validatePassword(password);
        })
        .then(isValid => {
          expect(isValid).to.be.true;
        });
    });

    it('Should reject users with missing username', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          password,
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Missing username in request body');
        });
    });

    it('Should reject users with missing password', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username,
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Missing password in request body');
        });
    });

    it('Should reject users with non-string username', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username: 45685,
          password,
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('username must be a string');
        });
    });

    it('Should reject users with non-string password', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username,
          password: 45685,
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('password must be a string');
        });
    });

    it('Should reject users with non-trimmed username', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username: ' fido1234 ',
          password,
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('username cannot start or end with whitespace');
        });
    });

    it('Should reject users with non-trimmed password', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username,
          password: ' fido1234 ',
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('password cannot start or end with whitespace');
        });
    });

    it('Should reject users with empty username', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username: '',
          password,
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('username must be at least 1 characters long');
        });
    });

    it('Should reject users with password less than 8 characters', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username,
          password: '1234',
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('password must be at least 8 characters long');
        });
    });

    it('Should reject users with password greater than 72 characters', function () {
      let res;
      let badWord = '123456789';
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username,
          password: badWord.repeat(12),
          fullname
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('password cannot be longer than 72 characters long');
        });
    });

    it('Should reject users with duplicate username', function () {
      return User.create({
        username,
        password,
        fullname
      })
        .then(() => {
          let res;
          return chai
            .request(app)
            .post('/api/users')
            .send({
              username,
              password,
              fullname
            })
            .then(_res => {
              res = _res;
              expect(res).to.have.status(400);
              expect(res.body.message).to.equal('The username already exists');
            });
        });
    });

    it('Should reject users with duplicate username', function () {
      return User.create({ username, password, fullname })
        .then(() => {
          return chai
            .request(app)
            .post('/api/users')
            .send({ username: 'exampleuser', password, fullname });
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('The username already exists');
        });
    });

    it('Should trim fullname', function () {
      let res;
      return chai
        .request(app)
        .post('/api/users')
        .send({
          username,
          password,
          fullname: ` ${fullname} `
        })
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('username', 'id', 'fullname', 'createdAt', 'updatedAt');
          expect(res.body.username).to.equal(username.toLowerCase());
          expect(res.body.fullname).to.equal(fullname);
          return User.findOne({
            username
          });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.fullname).to.equal(fullname);
        });
    });
  });
});

