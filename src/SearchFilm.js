import React, { useState } from "react";
import Results from "./Results";
import "./App.css";

export default function SearchFilm() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);

	console.log("movies", movies);

	const searchFilms = async (e) => {
		e.preventDefault();
		const url = `https://api.themoviedb.org/3/search/movie?api_key=2d98c5c34d2f26cf8200210a113de7f0&query=${query}`;
		try {
			const res = await fetch(url);
			const data = await res.json();
			console.log(data.results);
			const moviesWithImageUrl = data.results.map(function (movie) {
				return {
					...movie, //assigne l’url complet à l’objet (avec le spread)
					imageUrl:
						"https://image.tmdb.org/t/p/w185_and_h278_bestv2/" +
						movie.poster_path,
				};
			});
			setMovies(moviesWithImageUrl); //Mise à jour de la liste de films
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<form className="form" onSubmit={searchFilms}>
				<label className="label htmlFor=" query="true">
					Film Title
				</label>
				<input
					className="input"
					type="text"
					name="query"
					placeholder="i.e. Matrix"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="button" type="submit">
					Search
				</button>
			</form>
			<h3>Please check spelling.</h3>
			<div className="card-list">
				{movies
					.filter((movie) => movie.poster_path)
					.map((movie) => (
						<Results movie={movie} key={movie.id} />
					))}
			</div>
			<div>
				<label className="label htmlFor=" query="true">
					Top Popular Films Below
				</label>
				{movies
					.filter((movie) => parseFloat(movie.popularity) >= 8.0)
					.map((movie) => (
						<div className="card--content" style={{ display: "flex" }}>
							<img
								className="card--image"
								src={movie.imageUrl}
								alt={movie.title + " poster"}
							/>
							<h3 className="card--title">
								{movie.title}:&nbsp;
								{/* {movie.id} */}
								<span>{movie.popularity}</span>
							</h3>
						</div>
					))}
			</div>
		</>
	);
}
