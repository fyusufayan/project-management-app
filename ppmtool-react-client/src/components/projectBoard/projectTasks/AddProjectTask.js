import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { addProjectTask } from '../../../actions/backlogActions'


const AddProjectTask = (props) => {

    const dispatch=useDispatch()

    const error=useSelector(state=>state.error.errmessage)

    const {id}=props.match.params

    const [data,setData]=useState({
        summary:"",
        acceptanceCriteria:"",
        status:"",
        priority:0,
        dueDate:"",
        projectIdentifier:id
    })

    const onChange=(e)=>{
        setData(prevState=>{
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const newTask={
            summary:data.summary,
            acceptanceCriteria:data.acceptanceCriteria,
            status:data.status,
            priority:data.priority,
            dueDate:data.dueDate
        }
        dispatch(addProjectTask(data.projectIdentifier,newTask,props.history))
    }

  return (
    <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" onChange={onChange} value={data.summary} className={`form-control form-control-lg ${!error.summary ? "":"is-invalid"}`} name="summary" placeholder="Project Task summary" />
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

export default AddProjectTask