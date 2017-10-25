const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const { app } = require('../../server')
const { TodoList } = require('./../../models/todoList')

const { populateTodoItems } = require('../seed/seed')

beforeEach(populateTodoItems)

describe('POST /todoLists', () => {
  it('should create a new todo list', done => {
    const title = 'Test todo title'

    request(app)
      .post('/todoLists')
      .send({ title })
      .expect(200)
      .expect(res => expect(res.body.todoList.title).toBe(title))
      .end(async err => {
        if (err) {
          return done(err)
        }

        try {
          const todoLists = await TodoList.find({ title })
          expect(todoLists.length).toBe(1)
          expect(todoLists[0].title).toBe(title)
          done()
        } catch (err) {
          done(err)
        }
      })
  })

  it('should not create todo List with invalid body data', done => {
    const title = ''

    request(app)
      .post('/todoLists')
      .send({ title })
      .expect(400)
      .end(async err => {
        if (err) {
          return done(err)
        }

        try {
          const todoLists = await TodoList.find()
          expect(todoLists.length).toBe(1)
          done()
        } catch (err) {
          done(err)
        }
      })
  })
})

describe('GET /todoLists', () => {
  it('should get all todoLists', done => {
    TodoList.find()
      .then(todoLists => {
        request(app)
          .get('/todoLists')
          .expect(200)
          .expect(res => {
            expect(res.body.todoLists.length).toBe(todoLists.length)
          })
          .end(done)
      })
  })
})

describe('GET /todoLists/:todoListId', () => {
  it('should get a todo List with provided ID', done => {
    TodoList.find()
      .then(([todoList]) => {
        request(app)
          .get(`/todoLists/${todoList._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.todoList._id).toBe(todoList._id.toString())
            expect(res.body.todoList.title).toBe(todoList.title)
          })
          .end(done)
      })
      .catch(done)
  })

  it('should return a 404 with a non-ObjectId', done => {
    request(app)
      .get(`/todoLists/23123`)
      .expect(404)
      .end(done)
  })

  it('should return a 404 if a todo List was not found', done => {
    request(app)
      .get(`/todoLists/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todoLists/:todoListId', () => {
  it('should delete a todo List with provided ID', done => {
    TodoList.find()
      .then(([todoList]) => {
        request(app)
          .delete(`/todoLists/${todoList._id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.todoList._id).toBe(todoList._id.toString())
            expect(res.body.todoList.title).toBe(todoList.title)
          })
          .end(async (err, res) => {
            if (err) {
              return done(err)
            }

            try {
              const todoList = await TodoList.findById(res.body.todoList._id)
              expect(todoList).toBe(null)
              done()
            } catch (err) {
              done(err)
            }
          })
      })
      .catch(done)
  })

  it('should return a 404 with a non-ObjectId', done => {
    request(app)
      .delete(`/todoLists/23123`)
      .expect(404)
      .end(done)
  })

  it('should return a 404 if a todo List was not found', done => {
    request(app)
      .delete(`/todoLists/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done)
  })
})

describe('PATCH /todoLists/:todoListId', () => {
  it('should update the title of a todo List with provided ID', done => {
    const title = 'This test should pass'
    TodoList.find()
      .then(([todoList]) => {
        request(app)
          .patch(`/todoLists/${todoList._id}`)
          .send({ title })
          .expect(200)
          .expect(res => {
            expect(res.body.todoList._id).toBe(todoList._id.toString())
            expect(res.body.todoList.title).not.toBe(todoList.title)
          })
          .end(done)
      })
      .catch(done)
  })

  it('should update the completed of a todo List to true with updated completedAt with provided ID', done => {
    TodoList.find()
      .then(([todoList]) => {
        const completed = !todoList.completed
        request(app)
          .patch(`/todoLists/${todoList._id}`)
          .send({ completed })
          .expect(200)
          .expect(res => {
            expect(res.body.todoList._id).toBe(todoList._id.toString())
            expect(res.body.todoList.completed).not.toBe(todoList.completed)
            expect(res.body.todoList.completed).toBeTruthy()
            expect(res.body.todoList.completedAt).not.toBe(null)
          })
          .end(done)
      })
      .catch(done)
  })

  it('should update the completed of a todo List to false with a null completedAt with provided ID', done => {
    TodoList.find()
      .then(([todoList]) => {
        const completed = !todoList.completed
        request(app)
          .patch(`/todoLists/${todoList._id}`)
          .send({ completed })
          .end(err => {
            if (err) {
              done(err)
            }

            request(app)
              .patch(`/todoLists/${todoList._id}`)
              .send({ completed: !completed })
              .expect(200)
              .expect(res => {
                expect(res.body.todoList._id).toBe(todoList._id.toString())
                expect(res.body.todoList.completed).toBe(todoList.completed)
                expect(res.body.todoList.completed).toBeFalsy()
                expect(res.body.todoList.completedAt).toBe(null)
              })
              .end(done)
          })
      })
      .catch(done)
  })

  it('should return a 404 with a non-ObjectId', done => {
    request(app)
      .patch(`/todoLists/23123`)
      .expect(404)
      .end(done)
  })

  it('should return a 404 if a todo List was not found', done => {
    request(app)
      .patch(`/todoLists/${new ObjectId().toHexString()}`)
      .expect(404)
      .end(done)
  })
})
