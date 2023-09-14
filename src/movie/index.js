import { createMovieTag } from "./list";
import getMovies from "../api/movie";
import { createPagers } from "./pager";

async function init() {
    const resp = await getMovies(1, 30);
    createMovieTag(resp.data.movieList);
    createPagers(1, 30, resp.data.movieTotal);
}

init();