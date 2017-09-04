const {
  MongoClient,
  ObjectId
} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');
  }

  console.log('Connected to MongoDB server')

  db.collection('Todos')
    .count({ completed: false })
    .then(docs => {
      console.log(`Todos count: ${docs}`);
    })
    .catch(err => console.log('Unable to fetch todos', err))
    .then(() => db.close());

  // db.close();
})
