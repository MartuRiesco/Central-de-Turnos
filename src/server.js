import http from 'http';
import app from './app.js'
import config from './config.js';
import {init} from './Db/mongodb.js'


await init()

const PORT = config.port || 3000
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
