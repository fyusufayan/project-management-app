import axios from 'axios'
import {GET_ERRORS,GET_BACKLOG,GET_PROJECT_TASK,DELETE_PROJECT_TASK} from './types'
import { errorActions } from "../reducers/errorSlice";
import { projectTasksActions} from '../reducers/backlogSlice'



export const addProjectTask= (backlog_id,project_task,history)=>{
    return async dispatch=>{
        try {
            await axios.post(`http://localhost:8080/api/backlog/${backlog_id}`,project_task);
            history.push(`/projectBoard/${backlog_id}`)
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

export const getBacklog=(backlog_id)=>{
    return async dispatch=>{
        try {
            const res=await axios.get(`http://localhost:8080/api/backlog/${backlog_id}`)
            dispatch(projectTasksActions.getbacklogfunc({
                type:GET_BACKLOG,
                response:res.data
            }))
        } catch (err) {
            dispatch(errorActions.errorfunc({
                type:GET_ERRORS,
                errorMessage:err.response.data
            }))
        }
    }
}

export const getProjectTask=(backlog_id,pt_id,history)=>{
    return async dispatch=>{
        try {
            const res=await axios.get(`http://localhost:8080/api/backlog/${backlog_id}/${pt_id}`)
            dispatch(projectTasksActions.gettaskfunc({
                type:GET_PROJECT_TASK,
                response:res.data
            }))
        } catch (err) {
            history.push("/dashboard")
        }
    }
}

export const updateProjectTask=(backlog_id,pt_id,project_task,history)=>{
    return async dispatch=>{
        try {
            await axios.patch(`http://localhost:8080/api/backlog/${backlog_id}/${pt_id}`,project_task)
            history.push(`/projectBoard/${backlog_id}`)
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

export const deleteProjectTask=(backlog_id,pt_id)=>{
    return async dispatch=>{
        if(window.confirm(`You are deleting project task ${pt_id}, this action cannot be undone!`)){
            await axios.delete(`http://localhost:8080/api/backlog/${backlog_id}/${pt_id}`)
            dispatch(projectTasksActions.deletetaskfunc({
                type:DELETE_PROJECT_TASK,
                identifier:pt_id
            }))
        }
    }
}