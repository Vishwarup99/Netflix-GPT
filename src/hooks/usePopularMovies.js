import React, { useEffect } from 'react'

import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/moviesSlice';

const usePopularMovies = () => {

const dispatch = useDispatch();

const getPopularMovies = async() => {
    const data = await fetch("https://try.readme.io/https://api.themoviedb.org/3/movie/popular",API_OPTIONS);
    const result = await data.json();
    dispatch(addPopularMovies(result.results))
}

useEffect(() => {
    getPopularMovies();
},[]);

}

export default usePopularMovies;