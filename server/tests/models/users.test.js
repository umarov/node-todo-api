const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../../server');
const { User } = require('./../../models/user');

const {
  users,
  populateUsers
} = require('../seed/seed');

beforeEach(populateUsers);

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.user._id).toBe(users[0]._id.toHexString());
        expect(res.body.user.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => expect(res.body).toEqual({}))
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    const data = {
      email: 'example@example.com',
      password: 'password123'
    };

    request(app)
      .post('/users')
      .send(data)
      .expect(200)
      .expect(({ body, headers }) => {
        expect(headers['x-auth']).toBeDefined()
        expect(body.user._id).toBeDefined();
        expect(body.user.email).toBe(data.email);
      })
      .end(async err => {
        if (err) { return done(err); }

        try {
          const dbUsers = await User.find();
          expect(dbUsers.length).toBe(users.length + 1);
          expect(dbUsers[dbUsers.length - 1].password).not.toBe(data.password);
          done();
        } catch(err) {
          done(err);
        }
      });
  });

  it('should return validation errors if no password is provided', (done) => {
    const data = {
      email: 'example@example.com'
    };

    request(app)
      .post('/users')
      .send(data)
      .expect(400)
      .end(done);
  });

  it('should return validation errors if a bad password is provided', (done) => {
    const data = {
      email: 'example@example.com',
      password: '1'
    };

    request(app)
      .post('/users')
      .send(data)
      .expect(400)
      .end(done);
  });

  it('should return validation errors if a bad email is provided', (done) => {
    const data = {
      email: 'exampl',
      password: '1password1'
    };

    request(app)
      .post('/users')
      .send(data)
      .expect(400)
      .end(done);
  });

  it('should return validation errors if a bad data is provided', (done) => {
    const data = {
      email: '1',
      wat: '1password1'
    };

    request(app)
      .post('/users')
      .send(data)
      .expect(400)
      .end(done);
  });

  it('should not create user if email is in use', (done) => {
    const data = {
      email: 'example@example.com',
      password: 'password123'
    };

    request(app)
      .post('/users')
      .send(data)
      .expect(200)
      .end(async err => {
        if (err) { return done(err); }

        request(app)
          .post('/users')
          .send(data)
          .expect(400)
          .end(done);
      });

  });
});
