import {useState, useEffect} from "react";
import {BASE_URL, API_KEY} from "../../urls.js";

export const useHomeHooks = () => {

    const [page, setPage] = useState(1);
    const POPULAR_BASE_URL = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(null);
    const [state, setState] = useState({
        movies: []
    });

    // CAROUSEL
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    // CAROUSEL

    // FETCH FUNCTION FOR HOMEPAGE SEARCH
    const fetchMovies = async url => {
        const result = await (await fetch(url)).json();
        setState({
            movies: [...result.results]
        });
        setTotalPages(result.total_pages);
        setCurrentPage(result.page);
        setIndex(0);
    };
    // FETCH FUNCTION FOR HOMEPAGE SEARCH

    // FETCH ON MOUNT & PREV & NEXT
    useEffect(() => {
        fetchMovies(POPULAR_BASE_URL);
    }, [page]);
    // FETCH ON MOUNT & PREV & NEXT

    // PREV & NEXT BUTTONS
    const handleIncrement = () => {
        if (currentPage !== totalPages) {
            setPage(page + 1);
        } else {
            return null;
        }
    };
    const handleDecrement = () => {
        if (currentPage > 1) {
            setPage(page - 1);
        } else {
            return null;
        }
    };
    // PREV & NEXT BUTTONS

    return [{state}, index, handleSelect, currentPage, fetchMovies, handleDecrement, handleIncrement];
};