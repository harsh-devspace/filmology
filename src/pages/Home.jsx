import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import '../css/Home.css';
import { searchMovies, getPopularMovies } from '../services/api'

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                console.log("Movies: ", movies);

            } catch (err) {
                console.log("Actual Error: ", err);
                setError("Failed to load Movies...");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();

    }, [])

    async function handleSearch(e) {
        e.preventDefault();

        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log("Actual Error: ", err);
            setError("Failed to search Movies...");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className='search-form'>
                <input type="text" className='search-input' placeholder='search for movies' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type='submit' className='search-btn'>Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            {!loading && movies.length === 0 && (
                <div className="no-movies">
                    No movies found.
                </div>
            )}

            {loading ? <div className='loading'>Loading...</div> : <div className='movies-grid'>
                {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
            </div>}

        </div>
    )
}

export default Home
