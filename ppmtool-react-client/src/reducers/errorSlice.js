import { GET_ERRORS } from "../actions/types";
import { createSlice } from "@reduxjs/toolkit";

// const initialState={}

// export default function(state=initialState,action){
//     switch(action.type){

//         case GET_ERRORS:
//             return action.payload

//         default:
//             return state
//     }
// }

const errorSlice=createSlice({
    name:'error',
    initialState:{errmessage:{}},
    reducers:{
        errorfunc(state,action){
            if(action.payload.type===GET_ERRORS){
                state.errmessage=action.payload.errorMessage
            }

        }
    }
})


export const errorActions=errorSlice.actions
export default errorSlice;