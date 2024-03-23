import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import { configureStore } from "@reduxjs/toolkit";


const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt: gptReducer
    }
})

export default appStore;