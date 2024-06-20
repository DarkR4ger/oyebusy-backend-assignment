const express = require('express')
const app = express();
require('dotenv').config() // Load Environment Variables
const connectDB = require('./config/dbconfig');
const movieRoute = require('./routes/movieRoutes'); // route for movie

connectDB()


app.use(express.json())

app.use('/api/movie', movieRoute)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
