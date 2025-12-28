import Movie from "../models/movie.js"

export const getAllMovies = async (req, res) => {
    try {

        const Movies = await Movie.find()

        res.json({ message: "Fetched", Movies })

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

export const getSortedMovies = async (req, res) => {
    try {

        const { sortBy, order } = req.query

        const allowedFields = ["title", "rating", "releaseDate", "duration"]
        if (!allowedFields.includes(sortBy)) {
            return res.status(400).json({ message: "Invalid sort field" })
        }

        const sortOrder = order === "desc" ? -1 : 1

        const movies = await Movie.find().sort({ [sortBy]: sortOrder })

        res.json(movies)

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

export const searchMovies = async (req, res) => {
    try {

        const { query } = req.query
        if (!query) {
            return res.status(400).json({ message: "Search query required" })
        }

        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        })

        res.json(movies)

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}



export const addMovie = async (req, res) => {
    try {

        const { title, description, rating, releaseDate, duration } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const movie = await Movie.create({
            title,
            description,
            rating,
            releaseDate,
            duration,
            image
        });

        res.status(201).json({ message: "Movie listed", movie });

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}
export const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        const { title, description, rating, releaseDate, duration } = req.body;

        const updateData = {
            title,
            description,
            rating,
            releaseDate,
            duration,
        };

        // Handle image update
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            updateData,
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // IMPORTANT: return the movie directly
        res.json(updatedMovie);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const deleteMovie = async (req, res) => {
    try {

        const movieId = req.params.id
        const movie = await Movie.findByIdAndDelete(movieId)

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }

        res.json({ message: "Movie deleted successfully" })


    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}
