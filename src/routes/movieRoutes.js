const router = require("express").Router();
const Movie = require("../models/movieModel");

const authMidlleware = (req, res, next) => {
  console.log("middleware");
  next();
};

router.post("/add-movie", authMidlleware, async (request, response) => {
  try {
    const newMovie = new Movie(request.body);
    await newMovie.save();
    response.status(200).send({
      success: true,
      message: "Movie added succesfully",
    });
  } catch (err) {
    response.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-all", authMidlleware, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({
      success: true,
      data: movies,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-single", authMidlleware, async (req, res) => {
  const movieId = req.query.id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res.status(404).send({
        success: false,
        message: "Movie not found",
      });
    }
    res.send({
      success: true,
      data: movie,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-paginated", authMidlleware, async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);

  try {
    const skip = (page - 1) * size;
    const movies = await Movie.find().skip(skip).limit(size);
    const totalRecords = await Movie.countDocuments();

    res.status(200).send({
      page,
      size,
      totalRecords,
      totalPages: Math.ceil(totalRecords / size),
      movies,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
