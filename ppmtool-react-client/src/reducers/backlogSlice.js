import { GET_BACKLOG,GET_PROJECT_TASK,DELETE_PROJECT_TASK } from "../actions/types";
import { createSlice } from "@reduxjs/toolkit";



const projectTasksSlice=createSlice({
    name:'project_tasks',
    initialState:{
        project_tasks:[],
        project_task:{}
    },
    reducers:{
        getbacklogfunc(state,action){
            if(action.payload.type===GET_BACKLOG){
                state.project_tasks=action.payload.response
            }
        },
        gettaskfunc(state,action){
            if(action.payload.type===GET_PROJECT_TASK){
                state.project_task=action.payload.response
            }
        },
        deletetaskfunc(state,action){
            if(action.payload.type===DELETE_PROJECT_TASK){
                state.project_tasks=state.project_tasks.filter(project_task=>project_task.projectSequence !==action.payload.identifier)
            }
        }
    }
})


export const projectTasksActions=projectTasksSlice.actions
export default projectTasksSlice;