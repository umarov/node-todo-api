require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

switch (nodeEnv) {
  case 'development': {
    process.env.PORT = '3000';
    break;
  }
  case 'test': {
    process.env.PORT = '9999';
    break;
  }
  case 'production': {
    process.env.TODO_APP_URL = 'https://umarov.github.io';
    break;
  }

  default: {
    break;
  }
}
