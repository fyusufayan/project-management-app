import { GET_PROJECTS,GET_PROJECT,DELETE_PROJECT } from "../actions/types";
import { createSlice } from "@reduxjs/toolkit";



const projectsSlice=createSlice({
    name:'projects',
    initialState:{
        projects:[],
        project:{}
    },
    reducers:{
        projectsfunc(state,action){
            if(action.payload.type===GET_PROJECTS){
                state.projects=action.payload.projects
            }
        },
        projectfunc(state,action){
            if(action.payload.type===GET_PROJECT){
                state.project=action.payload.project
            }
        },
        deletefunc(state,action){
            if(action.payload.type===DELETE_PROJECT){
                state.projects=state.projects.filter(project=>project.projectIdentifier !==action.payload.projectId)
            }
        }
    }
})


export const projectsActions=projectsSlice.actions
export default projectsSlice;