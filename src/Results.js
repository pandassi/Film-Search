import React from "react"
import './App.css';

export default function Results(props) {

    //const movie = props.movie;
    //Or destructuring:
    const {movie} = props;
    //export default function Results({movie})

    let imageUrl = null
    if (movie)
		imageUrl =
			"https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movie.poster_path
	if (!movie) {
		return <div></div>
	}

    return (
        <>
        
            <div className="card">
               
                <img className="card--image"
                    src={imageUrl}
        alt={movie.title + 'poster'} />

            <div className="card--content">
             
                <h3 className="card--title">{movie.title}</h3>
                    <p><small>RELEASE DATE: {movie.release_date}</small></p>
                    <p><small>RATING: {movie.vote_average}</small></p>
                    <p className="card--desc">{movie.overview}</p>
                    </div>
                    </div>
                    
    
        </>
    )
}