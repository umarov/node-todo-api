const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('../../server');
const { TodoItem } = require('./../../models/todoItem');
const { TodoList } = require('./../../models/todoList');
const { getAuthToken } = require('../helpers/user-authentication');

const { todoItems, populateTodoItems } = require('../seed/seed');

beforeEach(populateTodoItems);

const getTodoList = async callback => {
  const [todoList] = await TodoList.find();
  callback(todoList);
};

describe('POST /todoItems', () => {
  it('should create a new todo', async () => {
    const authToken = await getAuthToken();
    const text = 'Test todo text';
    let [todoList] = await TodoList.find();
    const previousLength = todoList.todoItems.length;

    await request(app)
      .post(`/todoLists/${todoList._id}/todoItems`)
      .set('x-auth', authToken)
      .send({ todoItem: { text } })
      .expect(200);

    [todoList] = await TodoList.find();
    const todoItems = await todoList.todoItems;
    expect(todoItems.length).toBe(previousLength + 1);
    expect(todoItems[previousLength].text).toBe(text);
  });

  it('should not create todo item with invalid body data', async () => {
    const authToken = await getAuthToken();
    const text = '';

    const [todoList] = await TodoList.find();
    const previousLength = todoList.todoItems.length;

    await request(app)
      .post(`/todoLists/${todoList._id}/todoItems`)
      .set('x-auth', authToken)
      .send({ todoItem: { text } })
      .expect(400);
  });
});

describe('GET /todoItems', () => {
  it('should get all todoItems', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .get(`/todoLists/${todoList._id}/todoItems`)
      .set('x-auth', authToken)
      .expect(200)
      .expect(res => {
        expect(res.body.todoItems.length).toBe(todoItems.length);
      });
  });
});

describe('GET /todoItems/:todoItemId', () => {
  it('should get a todo item with provided ID', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();
    const [todoItem] = await todoList.todoItems;

    await request(app)
      .get(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
      .set('x-auth', authToken)
      .expect(200)
      .expect(res => {
        expect(res.body.todoItem._id).toBe(todoItem._id.toString());
        expect(res.body.todoItem.text).toBe(todoItem.text);
      });
  });

  it('should return a 404 with a non-ObjectId', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .get(`/todoLists/${todoList._id}/todoItems/23123`)
      .set('x-auth', authToken)
      .expect(404);
  });

  it('should return a 404 if a todo item was not found', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .get(
        `/todoLists/${todoList._id}/todoItems/${new ObjectId().toHexString()}`
      )
      .set('x-auth', authToken)
      .expect(404);
  });
});

describe('DELETE /todoItems/:todoItemId', () => {
  it('should delete a todo item with provided ID', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();
    const [todoItem] = await todoList.todoItems;

    await request(app)
      .delete(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
      .set('x-auth', authToken)
      .expect(200)
      .expect(async res => {
        const todoItem = await TodoItem.findById(res.body.todoItem._id);
        expect(todoItem).toBe(null);
      });
  });

  it('should return a 404 with a non-ObjectId', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .delete(`/todoLists/${todoList._id}/todoItems/23123`)
      .set('x-auth', authToken)
      .expect(404);
  });

  it('should return a 404 if a todo item was not found', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .delete(
        `/todoLists/${todoList._id}/todoItems/${new ObjectId().toHexString()}`
      )
      .set('x-auth', authToken)
      .expect(404);
  });
});

describe('PATCH /todoItems/:todoItemId', () => {
  it('should update the text of a todo item with provided ID', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();
    const text = 'This test should pass';
    const [todoItem] = await todoList.todoItems;

    await request(app)
      .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
      .set('x-auth', authToken)
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.todoItem._id).toBe(todoItem._id.toString());
        expect(res.body.todoItem.text).not.toBe(todoItem.text);
      });
  });

  it('should update the completed of a todo item to true with updated completedAt with provided ID', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();
    const [todoItem] = await todoList.todoItems;
    const completed = !todoItem.completed;

    await request(app)
      .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
      .set('x-auth', authToken)
      .send({ completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todoItem._id).toBe(todoItem._id.toString());
        expect(res.body.todoItem.completed).not.toBe(todoItem.completed);
        expect(res.body.todoItem.completed).toBeTruthy();
        expect(res.body.todoItem.completedAt).not.toBe(null);
      });
  });

  it('should update the completed of a todo item to false with a null completedAt with provided ID', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();
    const [todoItem] = await todoList.todoItems;
    const completed = !todoItem.completed;

    await request(app)
      .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
      .set('x-auth', authToken)
      .send({ completed });

    await request(app)
      .patch(`/todoLists/${todoList._id}/todoItems/${todoItem._id}`)
      .set('x-auth', authToken)
      .send({ completed: !completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todoItem._id).toBe(todoItem._id.toString());
        expect(res.body.todoItem.completed).toBe(todoItem.completed);
        expect(res.body.todoItem.completed).toBeFalsy();
        expect(res.body.todoItem.completedAt).toBe(null);
      });
  });

  it('should return a 404 with a non-ObjectId', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .patch(`/todoLists/${todoList._id}/todoItems/23123`)
      .set('x-auth', authToken)
      .expect(404);
  });

  it('should return a 404 if a todo item was not found', async () => {
    const authToken = await getAuthToken();
    const [todoList] = await TodoList.find();

    await request(app)
      .patch(
        `/todoLists/${todoList._id}/todoItems/${new ObjectId().toHexString()}`
      )
      .set('x-auth', authToken)
      .expect(404);
  });
});
