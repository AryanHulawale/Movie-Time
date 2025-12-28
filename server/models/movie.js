import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  rating: Number,
  releaseDate: Date,
  duration: Number,
  image: String 
});
const Movie = mongoose.model('Movie', MovieSchema);

export default Movie