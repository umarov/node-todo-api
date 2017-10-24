const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const { app } = require('../../server')
const { TodoItem } = require('./../../models/todoItem')
const { TodoList } = require('./../../models/todoList')

const { todoItems, populateTodoItems } = require('../seed/seed')

beforeEach(populateTodoItems)

const getTodoList = async callback => {
  const [todoList] = await TodoList.find()
  callback(todoList)
}

describe('POST /todoItems', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text'
    getTodoList(todoList => {
      const previousLength = todoList.todoItems.length
      request(app)
        .post(`/todoLists/${todoList._id}/todoItems`)
        .send({ text })
        .expect(200)
        .expect(res => expect(res.body.todoItem.text).toBe(text))
        .end(async err => {
          if (err) {
            return done(err)
          }

          try {
            const [todoList] = await TodoList.find()
            const todoItems = await todoList.todoItems
            expect(todoItems.length).toBe(previousLength + 1)
            expect(todoItems[previousLength].text).toBe(text)
            done()
          } catch (err) {
            done(err)
          }
        })
    })
  })

  it('should not create todo item with invalid body data', done => {
    const text = ''

    getTodoList(todoList => {
      const previousLength = todoList.todoItems.length

      request(app)
        .post(`/todoLists/${todoList._id}/todoItems`)
        .send({ text })
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /todoItems', () => {
  it('should get all todoItems', done => {
    getTodoList(todoList => {
      request(app)
        .get(`/todoLists/${todoList._id}/todoItems`)
        .expect(200)
        .expect(res => {
          expect(res.body.todoItems.length).toBe(todoItems.length)
        })
        .end(done)
    })
  })
})

describe('GET /todoItems/:todoItemId', () => {
  it('should get a todo item with provided ID', done => {
    getTodoList(async todoList => {
      const [todoItem] = await todoList.todoItems

      request(app)
        .get(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.todoItem._id).toBe(todoItem._id.toString())
          expect(res.body.todoItem.text).toBe(todoItem.text)
        })
        .end(done)
    })
  })

  it('should return a 404 with a non-ObjectId', done => {
    getTodoList(async todoList => {
      request(app)
        .get(`/todoLists/${todoList._id}/todoItems/23123`)
        .expect(404)
        .end(done)
    })
  })

  it('should return a 404 if a todo item was not found', done => {
    getTodoList(async todoList => {
      request(app)
        .get(
          `/todoLists/${todoList._id}/todoItems/${new ObjectId().toHexString()}`
        )
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /todoItems/:todoItemId', () => {
  it('should delete a todo item with provided ID', done => {
    getTodoList(async todoList => {
      const [todoItem] = await todoList.todoItems

      request(app)
        .delete(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.todoItem._id).toBe(todoItem._id.toString())
          expect(res.body.todoItem.text).toBe(todoItem.text)
        })
        .end(async (err, res) => {
          if (err) {
            return done(err)
          }

          try {
            const todoItem = await TodoItem.findById(res.body.todoItem._id)
            expect(todoItem).toBe(null)
            done()
          } catch (err) {
            done(err)
          }
        })
    }).catch(done)
  })

  it('should return a 404 with a non-ObjectId', done => {
    getTodoList(async todoList => {
      request(app)
        .delete(`/todoLists/${todoList._id}/todoItems/23123`)
        .expect(404)
        .end(done)
    })
  })

  it('should return a 404 if a todo item was not found', done => {
    getTodoList(async todoList => {
      request(app)
        .delete(
          `/todoLists/${todoList._id}/todoItems/${new ObjectId().toHexString()}`
        )
        .expect(404)
        .end(done)
    })
  })
})

describe('PATCH /todoItems/:todoItemId', () => {
  it('should update the text of a todo item with provided ID', done => {
    const text = 'This test should pass'
    getTodoList(async todoList => {
      const [todoItem] = await todoList.todoItems

      request(app)
        .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
        .send({ text })
        .expect(200)
        .expect(res => {
          expect(res.body.todoItem._id).toBe(todoItem._id.toString())
          expect(res.body.todoItem.text).not.toBe(todoItem.text)
        })
        .end(done)
    })
  })

  it('should update the completed of a todo item to true with updated completedAt with provided ID', done => {
    getTodoList(async todoList => {
      const [todoItem] = await todoList.todoItems

      const completed = !todoItem.completed
      request(app)
        .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
        .send({ completed })
        .expect(200)
        .expect(res => {
          expect(res.body.todoItem._id).toBe(todoItem._id.toString())
          expect(res.body.todoItem.completed).not.toBe(todoItem.completed)
          expect(res.body.todoItem.completed).toBeTruthy()
          expect(res.body.todoItem.completedAt).not.toBe(null)
        })
        .end(done)
    }).catch(done)
  })

  it('should update the completed of a todo item to false with a null completedAt with provided ID', done => {
    getTodoList(async todoList => {
      const [todoItem] = await todoList.todoItems
      const completed = !todoItem.completed
      request(app)
        .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
        .send({ completed })
        .end(err => {
          if (err) {
            done(err)
          }

          request(app)
            .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
            .send({ completed: !completed })
            .expect(200)
            .expect(res => {
              expect(res.body.todoItem._id).toBe(todoItem._id.toString())
              expect(res.body.todoItem.completed).toBe(todoItem.completed)
              expect(res.body.todoItem.completed).toBeFalsy()
              expect(res.body.todoItem.completedAt).toBe(null)
            })
            .end(done)
        })
    }).catch(done)
  })

  it('should return a 404 with a non-ObjectId', done => {
    getTodoList(todoList => {
      request(app)
        .patch(`/todoLists/${todoList._id}/todoItems/23123`)
        .expect(404)
        .end(done)
    })
  })

  it('should return a 404 if a todo item was not found', done => {
    getTodoList(todoList => {
      request(app)
        .patch(`/todoLists/${todoList._id}/todoItems/${new ObjectId().toHexString()}`)
        .expect(404)
        .end(done)
    })
  })
})
