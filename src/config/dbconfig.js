
const mongoose = require('mongoose')


const connectDB = async () => {
  try{
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('DB connected successfull')
  }
  catch(err) {
    console.error('DB connection failed', err.message)
    process.exit(1)
  }
}

module.exports = connectDB

//mongoose.connect(process.env.DATABASE_URL, {})
//const connection = mongoose.connection
//
//connection.on('connected', () => {
//  console.log('connection successfull')
//})
