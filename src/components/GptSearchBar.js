import React from 'react'
import openai from "../utils/openai";
import { useRef } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieList } from '../utils/gptSlice';
import { useDispatch } from 'react-redux';

const GptSearchBar = () => {
const dispatch = useDispatch();
const searchText = useRef(null);

const searchMovieinTMDB = async(movie) => {
    const data = await fetch(
        "https://try.readme.io/https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
  
      return json.results;
  

}

const handleGptSearchLink = async() => {
    console.log(searchText.current.value);

    const apiQuery = "Act as a Movie Recommendation System and suggest few movies for the Query:" + searchText.current.value + "Only give me Name of 5 Movies , comma Seperated like the Example result Given Ahead. Example Result: Oppenheimer , Spider Man , Jurassic Park , Titanic, Dune";

    const GptResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: apiQuery }],
        model: 'gpt-3.5-turbo',
    });

    if(!GptResponse.choices){
        //Error Handling to be done
    }

    const gptRecommendedMovies = GptResponse.choices?.[0]?.message.content.split(",");

    const data = gptRecommendedMovies.map((movie)=> searchMovieinTMDB(movie) );

    const tmdbResults = await Promise.all(data);

    console.log(GptResponse.choices);
    
    dispatch(addGptMovieList({movieNames: gptRecommendedMovies , gptMovies: tmdbResults}));
}

return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input type="text" className='p-4 m-4 col-span-9' placeholder='What would you like to watch today' ref={searchText}></input>
        <button className='py-2 px-4 bg-red-700 text-white col-span-3 rounded-lg m-4' onClick={handleGptSearchLink}>Search</button>
      </form>
    </div>
  )
}

export default GptSearchBar
