import axios from 'axios'
import {GET_ERRORS,GET_PROJECTS,GET_PROJECT,DELETE_PROJECT} from './types'
import { errorActions } from "../reducers/errorSlice";
import { projectsActions } from '../reducers/projectSlice';

export const createProject=(project,history)=>{
    return async dispatch=>{
        try {
            const res=await axios.post("http://localhost:8080/api/project",project)
    
            history.push("/dashboard")
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:{}
            }))
        } catch (err) {
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:err.response.data
            }))
        }
    }
} 

export const getProjects=()=>{
    return async dispatch=>{
        const res=await axios.get("http://localhost:8080/api/project/all")
        dispatch(projectsActions.projectsfunc({
            type:GET_PROJECTS,
            projects:res.data
        }))
    }
}

export const getProject=(id,history)=>{
    return async dispatch=>{

        try {
            const res=await axios.get(`http://localhost:8080/api/project/${id}`)
            dispatch(projectsActions.projectfunc({
                type:GET_PROJECT,
                project:res.data
            }))
        } catch (err) {
            history.push("/dashboard")
        }
    }
}

export const deleteProject=id=>{
    return async dispatch=>{

        if(window.confirm("Are you sure? this will delete the project and all the data related to id")){
            await axios.delete(`http://localhost:8080/api/project/${id}`)
            dispatch(projectsActions.deletefunc({
                type:DELETE_PROJECT,
                projectId:id
            }))
        }

    }
}