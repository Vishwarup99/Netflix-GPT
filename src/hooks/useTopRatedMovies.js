import React, { useEffect } from 'react'

import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {

const dispatch = useDispatch();

const getTopRatedMovies = async() => {
    const data = await fetch("https://try.readme.io/https://api.themoviedb.org/3/movie/top_rated",API_OPTIONS);
    const result = await data.json();
    dispatch(addTopRatedMovies(result.results))
}

useEffect(() => {
    getTopRatedMovies();
},[]);

}

export default useTopRatedMovies;