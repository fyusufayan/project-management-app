// import {createStore,applyMiddleware,compose} from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'

// const initialState={}
// const middleware=[thunk]

// let store

// store=createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middleware)))


// export default store



import { configureStore } from "@reduxjs/toolkit";
import errorSlice from './reducers/errorSlice.js'
import projectsSlice from "./reducers/projectSlice.js";


const store=configureStore({
    reducer:{
        error:errorSlice.reducer,
        projects:projectsSlice.reducer
    }
})

export default store