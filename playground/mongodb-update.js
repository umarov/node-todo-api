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
    .findOneAndUpdate(
      {
        _id: new ObjectId("59ac972388506de9f6ff9f1b")
      },
      {
        $set: {
          completed: true
        }
      },
      false
    )
    .then(docs => {
      console.log(docs);
    })
    .catch(err => console.log('Unable to fetch todos', err))
    .then(() => db.close());
});
