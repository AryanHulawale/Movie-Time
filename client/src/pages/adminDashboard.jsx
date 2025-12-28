import { useEffect, useState } from "react";
import api from "../axios/axios";
import { Pencil, Trash2, Search } from "lucide-react";
import AddMovie from "./addMovies";

export default function MovieInventory() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let url = "/movies/";
        if (search) {
          url = `/movies/search?query=${search}`;
        } else if (sortBy) {
          url = `/movies/sorted?sortBy=${sortBy}&order=asc`;
        }

        const res = await api.get(url);
        const data = res.data.Movies || res.data;
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        setMovies([]);
      }
    };

    loadMovies();
  }, [search, sortBy]);

  const handleSearch = (value) => {
    setSearch(value);
    if (value) setSortBy("");
  };

  const handleSort = (field) => {
    setSortBy(field);
    if (field) setSearch("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this movie?")) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Movie Inventory</h1>
          <p className="text-gray-400 text-sm">Manage your database.</p>
        </div>
        <button
          onClick={() => {
            setEditingMovie(null);
            setIsModelOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          + Add New Movie
        </button>
      </div>

      <div className="flex gap-4 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            className="w-full bg-[#151b23] pl-11 pr-4 py-3 rounded-lg outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <select
          className="bg-[#151b23] px-4 rounded-lg outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release Date</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      <div className="bg-[#121821] rounded-xl overflow-hidden border border-white/5">
        <table className="w-full text-sm">
          <thead className="bg-[#151b23] text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-5 py-4 text-left">Poster</th>
              <th className="px-5 py-4 text-left">Title</th>
              <th className="px-5 py-4 text-left">Rating</th>
              <th className="px-5 py-4 text-left">Release</th>
              <th className="px-5 py-4 text-left">Duration</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie._id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-5 py-4">
                    {movie.image ? (
                      <img
                        src={`http://localhost:5000${movie.image}`}
                        alt={movie.title}
                        className="w-12 h-16 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-16 bg-gray-700 rounded" />
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium">{movie.title}</td>
                  <td className="px-5 py-4">⭐ {movie.rating}</td>
                  <td className="px-5 py-4 text-gray-300">
                    {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-5 py-4 text-gray-300">{movie.duration} min</td>
                  <td className="px-5 py-4 text-right space-x-3">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setEditingMovie(movie);
                        setIsModelOpen(true);
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No movies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModelOpen && (
        <AddMovie
          setIsModelOpen={(val) => {
            setIsModelOpen(val);
            if (!val) setEditingMovie(null); // Reset editingMovie on close
          }}
          movieToEdit={editingMovie}
          onUpdate={(updatedMovie) => {
            setMovies((prevMovies) =>
              prevMovies.map((m) => (m._id === updatedMovie._id ? updatedMovie : m))
            );
            setEditingMovie(null);
          }}
        />
      )}
    </div>
  );
}
