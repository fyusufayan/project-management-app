import { configureStore } from "@reduxjs/toolkit";
import errorSlice from './reducers/errorSlice.js'
import projectsSlice from "./reducers/projectSlice.js";
import backlogSlice from "./reducers/backlogSlice.js"


const store=configureStore({
    reducer:{
        error:errorSlice.reducer,
        projects:projectsSlice.reducer,
        backlog:backlogSlice.reducer
    }
})

export default store