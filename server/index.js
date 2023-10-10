const dotenv = require('dotenv');
dotenv.config();
const server = require("./src/server");
const db = require('./src/db')

const PORT = 3001;

(async () => {
  try {
    const connection = await db;
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
  });
  }catch(err){
    console.log('Error', err)
  }
})()

