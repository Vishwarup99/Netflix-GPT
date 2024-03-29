import React, { useEffect } from 'react'

import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {

const dispatch = useDispatch();

const getUpcomingMovies = async() => {
    const data = await fetch("https://try.readme.io/https://api.themoviedb.org/3/movie/upcoming",API_OPTIONS);
    const result = await data.json();
    dispatch(addUpcomingMovies(result.results))
}

useEffect(() => {
    getUpcomingMovies();
},[]);

}

export default useUpcomingMovies;