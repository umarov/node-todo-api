const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('./../models/todo');

const todos = [
  { text: 'First test todo' },
  { text: 'Second test todo' },
]

beforeEach((done) => {
  Todo
    .remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done())
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
      })
      .end((err, res) => {
        if (err) { return done(err) }

        Todo
          .find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(done)
      });
  });

  it('should not create todo with invalid body data', (done) => {
    const text = '';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) { return done(err) }

        Todo
          .find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(done);
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
      .catch(done)
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
          .end((err, res) => {
            if (err) {
              done(err);
            }

            Todo
            .findById(res.body.todo._id)
            .then(todo => {
              expect(todo).toBe(null);
              done();
            })
            .catch(done);
          });
      })
      .catch(done)
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
