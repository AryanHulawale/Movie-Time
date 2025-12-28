import React, { useEffect, useState } from "react";
import api from "../axios/axios";
import toast from "react-hot-toast";

const AddMovie = ({ setIsModelOpen, movieToEdit, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(120);
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(7.5);
  const [image, setImage] = useState(null); // For uploading new poster
  const [preview, setPreview] = useState(); // For image preview

  // Prefill form when editing
  useEffect(() => {
    if (movieToEdit) {
      setTitle(movieToEdit.title || "");
      setDescription(movieToEdit.description || "");
      setDuration(movieToEdit.duration || 120);
      setReleaseDate(movieToEdit.releaseDate ? movieToEdit.releaseDate.slice(0, 10) : "");
      setRating(movieToEdit.rating || 7.5);
      setImage(null);
      setPreview(movieToEdit.image
        ? `http://localhost:5000${movieToEdit.image}`
        : ""); // Show existing image
    } else {
      setTitle("");
      setDescription("");
      setDuration(120);
      setReleaseDate("");
      setRating(7.5);
      setImage(null);
      setPreview("");
    }
  }, [movieToEdit]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rating", rating);
      formData.append("duration", duration);
      formData.append("releaseDate", releaseDate);
      if (image) formData.append("image", image); // Only append new image

      let res;
      if (movieToEdit) {
        // Update movie
        res = await api.put(`/movies/${movieToEdit._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onUpdate(res.data);
      } else {
        // Add new movie
        res = await api.post("/movies", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setIsModelOpen(false);
      toast.success(movieToEdit ? "Movie updated successfully" : "Movie added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setIsModelOpen(false)}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="w-full max-w-2xl p-6 rounded-xl bg-gray-900 text-white border border-gray-700 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl text-center font-semibold mb-2">
            {movieToEdit ? "Edit Movie" : "Add New Movie"}
          </h2>
          <p className="mb-6 text-gray-400 text-center">
            Enter movie details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Movie Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Duration (min)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                />
              </div>

              <div>
                <label>Release Date</label>
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                />
              </div>
            </div>

            <div>
              <label>Rating: {rating}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label>Poster Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-gray-400"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-24 h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModelOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
              >
                {movieToEdit ? "Update Movie" : "+ Add Movie"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMovie;
