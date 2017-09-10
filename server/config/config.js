const env = process.env.NODE_ENV || 'development';

switch(env) {
  case 'development': {
    process.env.PORT         = 3000;
    process.env.MONGODB_URI  = 'mongodb://localhost:27017/TodoApp';
    process.env.TODO_APP_URL = 'http://localhost:4200';
    break;
  }
  case 'test': {
    process.env.PORT        = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    break;
  }
  case 'production': {
    process.env.TODO_APP_URL = 'https://umarov.github.io';
    break;
  }
};
