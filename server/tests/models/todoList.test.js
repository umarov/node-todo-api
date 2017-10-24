// const expect = require('expect');
// const request = require('supertest');
// const { ObjectId } = require('mongodb');

// const { app } = require('../../server');
// const { TodoItem } = require('./../../models/todoItem');
// const { TodoList } = require('./../../models/todoList');

// const {
//   todoItems,
//   populateTodoItems,
// } = require('../seed/seed');

// beforeEach(populateTodoItems);

// describe('POST /todoItems', () => {
//   it('should create a new todo', (done) => {
//     const text = 'Test todo text';

//     request(app)
//       .post('/todoItems')
//       .send({ text, todoListId: new ObjectId() })
//       .expect(200)
//       .expect((res) => expect(res.body.todoItem.text).toBe(text))
//       .end(async (err) => {
//         if (err) { return done(err); }

//         try {
//           const todoItems = await TodoItem.find({ text })
//           expect(todoItems.length).toBe(1);
//           expect(todoItems[0].text).toBe(text);
//           done();
//         } catch(err) {
//           done(err);
//         }
//       });
//   });

//   it('should not create todo item with invalid body data', (done) => {
//     const text = '';

//     request(app)
//       .post('/todoItems')
//       .send({ text })
//       .expect(400)
//       .end(async (err) => {
//         if (err) { return done(err) }

//         try {
//           const todoItems = await TodoItem.find();
//           expect(todoItems.length).toBe(2);
//           done();
//         } catch(err) {
//           done(err);
//         }
//       });
//   });
// });

// describe('GET /todoItems', () => {
//   it('should get all todoItems', (done) => {
//     request(app)
//       .get('/todoItems')
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todoItems.length).toBe(todoItems.length);
//       })
//       .end(done);
//   });
// });

// describe('GET /todoItems/:todoItemId', () => {
//   it('should get a todo item with provided ID', (done) => {
//     TodoItem
//       .find()
//       .then(([todoItem, ]) => {
//         request(app)
//           .get(`/todoItems/${todoItem._id}`)
//           .expect(200)
//           .expect(res => {
//             expect(res.body.todoItem._id).toBe(todoItem._id.toString());
//             expect(res.body.todoItem.text).toBe(todoItem.text);
//           })
//           .end(done);
//       })
//       .catch(done);
//   });

//   it('should return a 404 with a non-ObjectId', (done) => {
//     request(app)
//       .get(`/todoItems/23123`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return a 404 if a todo item was not found', (done) => {
//     request(app)
//       .get(`/todoItems/${new ObjectId().toHexString()}`)
//       .expect(404)
//       .end(done);
//   });
// });

// describe('DELETE /todoItems/:todoItemId', () => {
//   it('should delete a todo item with provided ID', (done) => {
//     TodoItem
//       .find()
//       .then(([todoItem, ]) => {
//         request(app)
//           .delete(`/todoItems/${todoItem._id}`)
//           .expect(200)
//           .expect(res => {
//             expect(res.body.todoItem._id).toBe(todoItem._id.toString());
//             expect(res.body.todoItem.text).toBe(todoItem.text);
//           })
//           .end(async (err, res) => {
//             if (err) { return done(err); }

//             try {
//               const todoItem = await TodoItem.findById(res.body.todoItem._id);
//               expect(todoItem).toBe(null);
//               done();
//             } catch(err) {
//               done(err);
//             }
//           });
//       })
//       .catch(done);
//   });

//   it('should return a 404 with a non-ObjectId', (done) => {
//     request(app)
//       .delete(`/todoItems/23123`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return a 404 if a todo item was not found', (done) => {
//     request(app)
//       .delete(`/todoItems/${new ObjectId().toHexString()}`)
//       .expect(404)
//       .end(done);
//   });
// });

// describe('PATCH /todoItems/:todoItemId', () => {
//   it('should update the text of a todo item with provided ID', (done) => {
//     const text = "This test should pass"
//     TodoItem
//       .find()
//       .then(([todoItem, ]) => {
//         request(app)
//           .patch(`/todoItems/${todoItem._id}`)
//           .send({ text })
//           .expect(200)
//           .expect(res => {
//             expect(res.body.todoItem._id).toBe(todoItem._id.toString());
//             expect(res.body.todoItem.text).not.toBe(todoItem.text);
//           })
//           .end(done);
//       })
//       .catch(done);
//   });

//   it('should update the completed of a todo item to true with updated completedAt with provided ID', (done) => {
//     TodoItem
//       .find()
//       .then(([todoItem, ]) => {
//         const completed = !todoItem.completed
//         request(app)
//           .patch(`/todoItems/${todoItem._id}`)
//           .send({ completed })
//           .expect(200)
//           .expect(res => {
//             expect(res.body.todoItem._id).toBe(todoItem._id.toString());
//             expect(res.body.todoItem.completed).not.toBe(todoItem.completed);
//             expect(res.body.todoItem.completed).toBeTruthy();
//             expect(res.body.todoItem.completedAt).not.toBe(null);

//           })
//           .end(done);
//       })
//       .catch(done);
//   });

//   it('should update the completed of a todo item to false with a null completedAt with provided ID', (done) => {
//     TodoItem
//       .find()
//       .then(([todoItem, ]) => {
//         const completed = !todoItem.completed
//         request(app)
//           .patch(`/todoItems/${todoItem._id}`)
//           .send({ completed })
//           .end((err) => {
//             if (err) { done(err) }

//             request(app)
//               .patch(`/todoItems/${todoItem._id}`)
//               .send({ completed: !completed })
//               .expect(200)
//               .expect(res => {
//                 expect(res.body.todoItem._id).toBe(todoItem._id.toString());
//                 expect(res.body.todoItem.completed).toBe(todoItem.completed);
//                 expect(res.body.todoItem.completed).toBeFalsy();
//                 expect(res.body.todoItem.completedAt).toBe(null);

//               })
//               .end(done);
//           });
//       })
//       .catch(done);
//   });

//   it('should return a 404 with a non-ObjectId', (done) => {
//     request(app)
//       .patch(`/todoItems/23123`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return a 404 if a todo item was not found', (done) => {
//     request(app)
//       .patch(`/todoItems/${new ObjectId().toHexString()}`)
//       .expect(404)
//       .end(done);
//   });
// });



