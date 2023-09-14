import axios from 'axios';

export default async function getMovies(page, limit) {
    const movies = await axios.get('/api/movies', {
        params: {
            page,
            size: limit,
        }
    })
    return movies.data;
}