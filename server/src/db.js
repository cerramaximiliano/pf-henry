const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

            const db =  mongoose.connect(process.env.MONGO_URI,
                {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
                });



module.exports = db;