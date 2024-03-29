import React, { useEffect } from 'react'

import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {

const dispatch = useDispatch();
const nowPlayingmovies = useSelector(store => store.movies.nowPlayingmovies);

const getNowPlayingMovies = async() => {
    const data = await fetch("https://try.readme.io/https://api.themoviedb.org/3/movie/now_playing?page=1",API_OPTIONS);
    const result = await data.json();
    dispatch(addNowPlayingMovies(result.results))
}

useEffect(() => {
    if(!nowPlayingmovies) {
        getNowPlayingMovies();
    }
},[]);

}

export default useNowPlayingMovies;