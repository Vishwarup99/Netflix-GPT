import React from 'react'
import BackgroundVideo from './BackgroundVideo';
import VideoTitle from './VideoTitle';
import { useSelector } from 'react-redux';

const MainContainer = () => {

const movies = useSelector((store)=> store.movies?.nowPlayingMovies);
if(movies === null) return;   //Early Return

const mainMovie = movies[0];

const { original_title , overview, id} = mainMovie;

  return (
    <div className="md:pt-0 pt-[30%] bg-black md:pb-[7%]">
      <VideoTitle title={original_title} overview={overview}/>
      <BackgroundVideo movieId={id}/>
    </div>
  )
}

export default MainContainer
