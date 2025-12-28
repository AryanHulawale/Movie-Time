import React, { useEffect, useState } from "react";
import api from "../axios/axios";

const DashboardPage = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await api.get("/movies");
      setMovies(res.data.Movies || []);
    } catch (err) {
      toast.error("Failed to add movie");
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      fetchMovies();
      return;
    }

    const res = await api.get(`/movies/search?query=${value}`);
    setMovies(res.data);
  };

  // SORT
  const handleSort = async (field) => {
    setSortBy(field);
    const res = await api.get(
      `/movies/sort?sortBy=${field}&order=desc`
    );
    setMovies(res.data);
  };


  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-white/10">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-blue-500">MovieApp</h1>
          <ul className="flex gap-6 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Genre</li>
            <li className="hover:text-white cursor-pointer">My List</li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search movies, actors..."
            className="bg-[#151b23] px-4 py-2 rounded-lg text-sm outline-none"
          />
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative h-[420px] flex items-center px-10"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(11,15,20,0.9) 20%, rgba(11,15,20,0.2)),
      url('https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-xl space-y-4">
          <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">
            FEATURED
          </span>
          <h2 className="text-4xl font-extrabold leading-tight">
            Cyberpunk: The New Era
          </h2>
          <p className="text-sm text-gray-300">
            In a dystopian future, a mercenary outlaw navigates a metropolis
            obsessed with power, glamour, and body modification.
          </p>

          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
              ▶ Watch Now
            </button>
            <button className="bg-white/10 px-6 py-3 rounded-lg">
              + My List
            </button>
          </div>
        </div>
      </section>

      {/* MOVIE GRID */}
      <section className="px-10 py-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">All Movies</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="group">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#151b23]">
                <img
                  src={`http://localhost:5000${movie.image}`}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>

              <div className="mt-2 space-y-1">
                <h4 className="text-sm font-semibold truncate">
                  {movie.title}
                </h4>
                <div className="flex justify-between text-xs text-gray-400">
                  <span className="text-yellow-400">
                    ★ {movie.rating || "N/A"}
                  </span>
                  <span>
                    {new Date(movie.releaseDate).getFullYear()} •{" "}
                    {movie.duration}m
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-10 py-6 text-sm text-gray-400 flex justify-between">
        <span>© 2024 MovieApp. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="cursor-pointer">Privacy Policy</span>
          <span className="cursor-pointer">Terms of Service</span>
          <span className="cursor-pointer">Help Center</span>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
