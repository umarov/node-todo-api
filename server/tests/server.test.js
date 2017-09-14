const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

const {
  todos,
  users,
  populateTodos,
  populateUsers
} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => expect(res.body.todo.text).toBe(text))
      .end(async (err) => {
        if (err) { return done(err); }

        try {
          const todos = await Todo.find({ text })
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        } catch(err) {
          done(err);
        }
      });
  });

  it('should not create todo with invalid body data', (done) => {
    const text = '';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end(async (err) => {
        if (err) { return done(err) }

        try {
          const todos = await Todo.find();
          expect(todos.length).toBe(2);
          done();
        } catch(err) {
          done(err);
        }
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(todos.length);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get a todo with provided ID', (done) => {
    Todo
      .find()
      .then(([todo, ]) => {
        request(app)
          .get(`/todos/${todo._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.todo._id).toBe(todo._id.toString());
            expect(res.body.todo.text).toBe(todo.text);
          })
          .end(done);
      })
      .catch(done);
  });

  it('should return a 404 with a non-ObjectId', (done) => {
    request(app)
      .get(`/todos/23123`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if a todo was not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo with provided ID', (done) => {
    Todo
      .find()
      .then(([todo, ]) => {
        request(app)
          .delete(`/todos/${todo._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.todo._id).toBe(todo._id.toString());
            expect(res.body.todo.text).toBe(todo.text);
          })
          .end(async (err, res) => {
            if (err) { return done(err); }

            try {
              const todo = await Todo.findById(res.body.todo._id);
              expect(todo).toBe(null);
              done();
            } catch(err) {
              done(err);
            }
          });
      })
      .catch(done);
  });

  it('should return a 404 with a non-ObjectId', (done) => {
    request(app)
      .delete(`/todos/23123`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if a todo was not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the text of a todo with provided ID', (done) => {
    const text = "This test should pass"
    Todo
      .find()
      .then(([todo, ]) => {
        request(app)
          .patch(`/todos/${todo._id}`)
          .send({ text })
          .expect(200)
          .expect(res => {
            expect(res.body.todo._id).toBe(todo._id.toString());
            expect(res.body.todo.text).not.toBe(todo.text);
          })
          .end(done);
      })
      .catch(done);
  });

  it('should update the completed of a todo to true with updated completedAt with provided ID', (done) => {
    Todo
      .find()
      .then(([todo, ]) => {
        const completed = !todo.completed
        request(app)
          .patch(`/todos/${todo._id}`)
          .send({ completed })
          .expect(200)
          .expect(res => {
            expect(res.body.todo._id).toBe(todo._id.toString());
            expect(res.body.todo.completed).not.toBe(todo.completed);
            expect(res.body.todo.completed).toBeTruthy();
            expect(res.body.todo.completedAt).not.toBe(null);

          })
          .end(done);
      })
      .catch(done);
  });

  it('should update the completed of a todo to false with a null completedAt with provided ID', (done) => {
    Todo
      .find()
      .then(([todo, ]) => {
        const completed = !todo.completed
        request(app)
          .patch(`/todos/${todo._id}`)
          .send({ completed })
          .end((err) => {
            if (err) { done(err) }

            request(app)
              .patch(`/todos/${todo._id}`)
              .send({ completed: !completed })
              .expect(200)
              .expect(res => {
                expect(res.body.todo._id).toBe(todo._id.toString());
                expect(res.body.todo.completed).toBe(todo.completed);
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toBe(null);

              })
              .end(done);
          });
      })
      .catch(done);
  });

  it('should return a 404 with a non-ObjectId', (done) => {
    request(app)
      .patch(`/todos/23123`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if a todo was not found', (done) => {
    request(app)
      .patch(`/todos/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done);
  });
});


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
