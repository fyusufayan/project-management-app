import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createProject } from '../../actions/projectActions'

const AddProject = (props,{nextProp}) => {

    const dispatch=useDispatch()

    const error=useSelector(state=>state.error.errmessage)


    const[data,setData]=useState({
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: ""
    })


    const onChange=(e)=>{
        setData(prevState=>{
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        const newProject={
            projectName: data.projectName,
            projectIdentifier: data.projectIdentifier,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date
        }
        dispatch(createProject(newProject,props.history))
    }


    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create Project form</h5>
                        <hr />
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input type="text" className={`form-control form-control-lg ${!error.projectName ? "":"is-invalid"}`} placeholder="Project Name" name='projectName' value={data.projectName} onChange={onChange}/>
                                {error.projectName && (
                                    <div className="invalid-feedback">{error.projectName}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input type="text" className={`form-control form-control-lg ${!error.projectIdentifier ? "":"is-invalid"}`} placeholder="Unique Project ID" name='projectIdentifier' value={data.projectIdentifier} onChange={onChange}/>
                                {error.projectIdentifier && (
                                    <div className="invalid-feedback">{error.projectIdentifier}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <textarea className={`form-control form-control-lg ${!error.description ? "":"is-invalid"}`} placeholder="Project Description" name='description' value={data.description} onChange={onChange}></textarea>
                                {error.description && (
                                    <div className="invalid-feedback">{error.description}</div>
                                )}
                            </div>
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" name="start_date" value={data.start_date} onChange={onChange}/>
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" name="end_date" value={data.end_date} onChange={onChange}/>
                            </div>

                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject;