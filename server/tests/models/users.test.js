const expect = require('expect');
const request = require('supertest');

const { setupServer } = require('../../server');

const { users, populateUsers } = require('../seed/seed');

let app;

before(async () => {
  app = await setupServer()
})

beforeEach(populateUsers);

describe('GET /users/me', () => {
  it('should return user if authenticated', async () => {
    await request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.user._id).toBe(users[0]._id.toHexString());
        expect(res.body.user.email).toBe(users[0].email);
      });
  });

  it('should return 401 if not authenticated', async () => {
    await request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => expect(res.body).toEqual({}));
  });
});

describe('POST /users', () => {
  it('should create a user', async () => {
    const data = {
      email: 'example@example.com',
      password: 'password123',
    };

    await request(app)
      .post('/users')
      .send(data)
      .expect(200)
      .expect(({ body, headers }) => {
        expect(headers['x-auth']).toBeDefined();
        expect(body.user._id).toBeDefined();
        expect(body.user.email).toBe(data.email);
      });

    const dbUsers = await User.find();
    expect(dbUsers.length).toBe(users.length + 1);
    expect(dbUsers[dbUsers.length - 1].password).not.toBe(data.password);
  });

  it('should return validation errors if no password is provided', async () => {
    const data = {
      email: 'example@example.com',
    };

    await request(app)
      .post('/users')
      .send(data)
      .expect(400);
  });

  it('should return validation errors if a bad password is provided', async () => {
    const data = {
      email: 'example@example.com',
      password: '1',
    };

    await request(app)
      .post('/users')
      .send(data)
      .expect(400);
  });

  it('should return validation errors if a bad email is provided', async () => {
    const data = {
      email: 'exampl',
      password: '1password1',
    };

    await request(app)
      .post('/users')
      .send(data)
      .expect(400);
  });

  it('should return validation errors if a bad data is provided', async () => {
    const data = {
      email: '1',
      wat: '1password1',
    };

    await request(app)
      .post('/users')
      .send(data)
      .expect(400);
  });

  it('should not create user if email is in use', async () => {
    const data = {
      email: 'example@example.com',
      password: 'password123',
    };

    await request(app)
      .post('/users')
      .send(data)
      .expect(200);

    await request(app)
      .post('/users')
      .send(data)
      .expect(400);
  });
});
