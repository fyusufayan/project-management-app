import React,{useState,useEffect} from 'react'
import {getProjectTask,updateProjectTask} from '../../../actions/backlogActions'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const UpdateProjectTask = (props) => {

    const {backlog_id,pt_id}=props.match.params;

    const dispatch=useDispatch()

    const project_task=useSelector(state=>state.backlog.project_task)
    const error=useSelector(state=>state.error.errmessage)

    const [isLoaded,setIsLoaded]=useState(false)

    if(!isLoaded){
        dispatch(getProjectTask(backlog_id,pt_id,props.history))
        setIsLoaded(true)
    }

    const [data,setData]=useState({
        id:"",
        projectSequence:"",
        summary:"",
        acceptanceCriteria:"",
        status:"",
        priority:"",
        dueDate:null,
        projectIdentifier:"",
        create_At:""
    })


    useEffect(()=>{
        setData({
            id:project_task.id,
            projectSequence:project_task.projectSequence,
            summary:project_task.summary,
            acceptanceCriteria:project_task.acceptanceCriteria,
            status:project_task.status,
            priority:project_task.priority,
            dueDate:project_task.dueDate,
            projectIdentifier:project_task.projectIdentifier,
            create_At:project_task.create_At
        })
    },[project_task])



    const onChange=(e)=>{
        setData(prevState=>{
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const updatedProjectTask={
            id:data.id,
            projectSequence:data.projectSequence,
            summary:data.summary,
            acceptanceCriteria:data.acceptanceCriteria,
            status:data.status,
            priority:data.priority,
            dueDate:data.dueDate,
            projectIdentifier:data.projectIdentifier,
            create_At:data.create_At
        }
        dispatch(updateProjectTask(data.projectIdentifier,data.projectSequence,updatedProjectTask,props.history))
    }

  return (
    <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${data.projectIdentifier}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <p className="lead text-center">Project Name: {data.projectIdentifier} | Project Task ID: {data.projectSequence}</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input onChange={onChange} value={data.summary} type="text" className={`form-control form-control-lg ${!error.summary ? "":"is-invalid"}`} name="summary" placeholder="Project Task summary" />
                            {error.summary && (
                                    <div className="invalid-feedback">{error.summary}</div>
                        )}
                        </div>
                        <div className="form-group">
                            <textarea onChange={onChange} value={data.acceptanceCriteria} className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input onChange={onChange} value={data.dueDate} type="date" className="form-control form-control-lg" name="dueDate" />
                        </div>
                        <div className="form-group">
                            <select onChange={onChange} value={data.priority} className="form-control form-control-lg" name="priority">
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select onChange={onChange} value={data.status} className="form-control form-control-lg" name="status">
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProjectTask