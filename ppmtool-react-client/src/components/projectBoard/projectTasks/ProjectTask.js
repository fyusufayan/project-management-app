import React from 'react'
import { Link } from 'react-router-dom';
import {deleteProjectTask} from '../../../actions/backlogActions'
import { useDispatch,useSelector } from 'react-redux'



const ProjectTask = (props) => {

    const dispatch=useDispatch()

    const error=useSelector(state=>state.error.errmessage)


    const {project_task}=props
    let priorityString;
    let priorityClass;

    if(project_task.priority===1){
        priorityClass="bg-danger text-light"
        priorityString="HIGH"
    }
    if(project_task.priority===2){
        priorityClass="bg-warning text-light"
        priorityString="MEDIUM"
    }
    if(project_task.priority===3){
        priorityClass="bg-info text-light"
        priorityString="LOW"
    }

    const onDeleteClick=()=>{
        dispatch(deleteProjectTask(project_task.projectIdentifier,project_task.projectSequence))
    }

  return (
      
    <div className="card mb-1 bg-light">

        <div className={`card-header text-primary ${priorityClass}`}>
            ID: {project_task.projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
            <h5 className="card-title">{project_task.summary}</h5>
            <p className="card-text text-truncate ">
                {project_task.acceptanceCriteria}
            </p>
            <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`} className="btn btn-primary">
                View / Update
            </Link>

            <button onClick={onDeleteClick} className="btn btn-danger ml-4">
                Delete
            </button>
        </div>
    </div>

  )
}

export default ProjectTask