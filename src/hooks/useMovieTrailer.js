import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { useEffect } from 'react';


const useMovieTrailer = (movieId) => {
const dispatch = useDispatch();

const getMovieVideos = async() => {
    const data = await fetch(`https://try.readme.io/https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US` , API_OPTIONS);
    const result = await data.json();

    const trailer = result.results.filter(item => item.type === "Trailer");
    const filteredTrailer = trailer.length ? trailer[0] : result.results[0];
    console.log("V"+filteredTrailer);
    dispatch(addTrailerVideo(filteredTrailer))
}

useEffect(()=>{
    getMovieVideos()
},[])
}

export default useMovieTrailer;