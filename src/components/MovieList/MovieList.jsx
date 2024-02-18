import React, { useEffect, useState } from "react";
import "./MovieList.css";

import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";
import _ from "lodash";

const MovieList = ({ type, title, emoji }) => {
  const [movies, setmovies] = useState([]);
  const [filterMovies, setfilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);

  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  useEffect(() => {
    fetchMovies();
    // fetch('https://api.themoviedb.org/3/movie/popular?api_key=83837907fa5c7cdbc976c9e12ca2c412').then((res) => res.json()).then((data) => console.log(data))
  }, [type]);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setfilterMovies(sortedMovies);
    }
  }),
    [sort];

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=83837907fa5c7cdbc976c9e12ca2c412`
    );
    const data = await response.json();
    setmovies(data.results);
    setfilterMovies(data.results);
  };

  const handleFilter = (rate) => {
    if (rate.rate === minRating.rate) {
      setMinRating(0);
      setfilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter(
        (movie) => movie.vote_average >= rate.rate
      );
      setfilterMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            id=""
            className="movie_sorting"
            onChange={handleSort}
            value={sort.by}
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
