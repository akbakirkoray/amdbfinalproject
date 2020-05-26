import {useState, useEffect, useCallback} from "react";
import {BASE_URL, API_KEY} from "../../urls.js";

export const useMovieHooks = (movieId) => {
    const [state, setState] = useState({});

    // FETCH FUNCTION FOR MOVIE RESULT INFO
    const fetchData = useCallback(async () => {

        const endpoint = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}`;
        const result = await (await fetch(endpoint)).json();
        const creditsEndpoint = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();

        setState({
            ...result,
            actors: creditsResult.cast,
        });

    }, [movieId]);
    // FETCH FUNCTION FOR MOVIE RESULT INFO

    // FETCH WHEN CLICK ON POSTER
    useEffect(() => {
        fetchData();
    }, [fetchData, movieId]);
    // FETCH WHEN CLICK ON POSTER

    return [state];
};