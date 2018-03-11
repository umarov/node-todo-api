const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { setupServer } = require('../../server');
const { populateTodoItems } = require('../seed/seed');
const { getAuthToken } = require('../helpers/user-authentication');

let app;

before(async () => {
  app = await setupServer();
});

beforeEach(populateTodoItems);

describe('POST /todoLists', () => {
  it('should create a new todo list', async () => {
    const authToken = await getAuthToken();
    const title = 'Test todo title';
    await request(app)
      .post('/todoLists')
      .set('x-auth', authToken)
      .send({ title })
      .expect(200)
      .expect(res => expect(res.body.todoList.title).toBe(title));

    const todoLists = await TodoList.find({ title });
    expect(todoLists.length).toBe(1);
    expect(todoLists[0].title).toBe(title);
  });

  it('should not create todo List with invalid body data', async () => {
    const title = '';
    const authToken = await getAuthToken();
    await request(app)
      .post('/todoLists')
      .set('x-auth', authToken)
      .send({ title })
      .expect(400);

    const todoLists = await TodoList.find();
    expect(todoLists.length).toBe(1);
  });
});

describe('GET /todoLists', () => {
  it('should get all todoLists', async () => {
    const todoLists = await TodoList.find();
    const authToken = await getAuthToken();
    await request(app)
      .get('/todoLists')
      .set('x-auth', authToken)
      .expect(200)
      .expect(res => {
        expect(res.body.todoLists.length).toBe(todoLists.length);
      });
  });
});

describe('GET /todoLists/:todoListId', () => {
  it('should get a todo List with provided ID', async () => {
    const [todoList] = await TodoList.find();
    const authToken = await getAuthToken();

    await request(app)
      .get(`/todoLists/${todoList._id}`)
      .set('x-auth', authToken)
      .expect(200)
      .expect(res => {
        expect(res.body.todoList._id).toBe(todoList._id.toString());
        expect(res.body.todoList.title).toBe(todoList.title);
      });
  });

  it('should return a 404 with a non-ObjectId', async () => {
    const authToken = await getAuthToken();

    await request(app)
      .get('/todoLists/23123')
      .set('x-auth', authToken)
      .expect(404);
  });

  it('should return a 404 if a todo List was not found', async () => {
    const authToken = await getAuthToken();

    await request(app)
      .get(`/todoLists/${new ObjectId().toHexString()}`)
      .set('x-auth', authToken)
      .expect(404);
  });
});

describe('DELETE /todoLists/:todoListId', () => {
  it('should delete a todo List with provided ID', async () => {
    const [todoList] = await TodoList.find();
    const authToken = await getAuthToken();

    await request(app)
      .delete(`/todoLists/${todoList._id}`)
      .set('x-auth', authToken)
      .expect(200)
      .expect(async res => {
        expect(res.body.todoList._id).toBe(todoList._id.toString());
        expect(res.body.todoList.title).toBe(todoList.title);

        const deletedList = await TodoList.findById(res.body.todoList._id);
        expect(deletedList).toBe(null);
      });
  });

  it('should return a 404 with a non-ObjectId', async () => {
    const authToken = await getAuthToken();

    await request(app)
      .delete('/todoLists/23123')
      .set('x-auth', authToken)
      .expect(404);
  });

  it('should return a 404 if a todo List was not found', async () => {
    const authToken = await getAuthToken();

    await request(app)
      .delete(`/todoLists/${new ObjectId().toHexString()}`)
      .set('x-auth', authToken)
      .expect(404);
  });
});

describe('PATCH /todoLists/:todoListId', () => {
  it('should update the title of a todo List with provided ID', async () => {
    const title = 'This test should pass';
    const [todoList] = await TodoList.find();
    const authToken = await getAuthToken();

    await request(app)
      .patch(`/todoLists/${todoList._id}`)
      .set('x-auth', authToken)
      .send({ title })
      .expect(200)
      .expect(res => {
        expect(res.body.todoList._id).toBe(todoList._id.toString());
        expect(res.body.todoList.title).not.toBe(todoList.title);
      });
  });

  it('should update the completed of a todo List to true with updated completedAt with provided ID', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();
    const completed = !todoList.completed;

    await request(app)
      .patch(`/todoLists/${todoList._id}`)
      .set('x-auth', authToken)
      .send({ completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todoList._id).toBe(todoList._id.toString());
        expect(res.body.todoList.completed).not.toBe(todoList.completed);
        expect(res.body.todoList.completed).toBeTruthy();
        expect(res.body.todoList.completedAt).not.toBe(null);
      });
  });

  it('should update the completed of a todo List to false with a null completedAt with provided ID', async () => {
    const [todoList] = await TodoList.find();
    const completed = !todoList.completed;
    const authToken = await getAuthToken();

    await request(app)
      .patch(`/todoLists/${todoList._id}`)
      .set('x-auth', authToken)
      .send({ completed });

    await request(app)
      .patch(`/todoLists/${todoList._id}`)
      .set('x-auth', authToken)
      .send({ completed: !completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todoList._id).toBe(todoList._id.toString());
        expect(res.body.todoList.completed).toBe(todoList.completed);
        expect(res.body.todoList.completed).toBeFalsy();
        expect(res.body.todoList.completedAt).toBe(null);
      });
  });

  it('should return a 404 with a non-ObjectId', async () => {
    const authToken = await getAuthToken();

    await request(app)
      .patch('/todoLists/23123')
      .set('x-auth', authToken)
      .expect(404);
  });

  it('should return a 404 if a todo List was not found', async () => {
    const authToken = await getAuthToken();

    await request(app)
      .patch(`/todoLists/${new ObjectId().toHexString()}`)
      .set('x-auth', authToken)
      .expect(404);
  });
});
