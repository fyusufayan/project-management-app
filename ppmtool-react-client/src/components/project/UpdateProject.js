import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getProject, createProject } from '../../actions/projectActions'

const UpdateProject = (props) => {

    const {id}=props.match.params

    const [myId,setMyId]=useState()
    const dispatch=useDispatch()


    if(myId !== id){
        dispatch(getProject(id,props.history))
        setMyId(id)
    }

    const project=useSelector(state=>state.projects.project)
    const error=useSelector(state=>state.error.errmessage)


    const[data,setData]=useState({
        // id:project.id,
        // projectName: project.projectName,
        // projectIdentifier: project.projectIdentifier,
        // description: project.description,
        // start_date: project.start_date,
        // end_date: project.end_date
        id:"",
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: ""
    })

    useEffect(()=>{
        setData({
            id:project.id,
            projectName: project.projectName,
            projectIdentifier: project.projectIdentifier,
            description: project.description,
            start_date: project.start_date,
            end_date: project.end_date
        })
    },[project])



    const onChange=(e)=>{
        setData(prevState=>{
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const updatedProject={
            id:data.id,
            projectName: data.projectName,
            projectIdentifier: data.projectIdentifier,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date
        }
        dispatch(createProject(updatedProject,props.history))
    }

  return (
    <div className="project">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Update Project form</h5>
                <hr />
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" value={data.projectName} className={`form-control form-control-lg ${!error.projectName ? "":"is-invalid"}`} name='projectName' placeholder="Project Name" onChange={onChange}/>
                        {error.projectName && (
                                    <div className="invalid-feedback">{error.projectName}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <input type="text" value={data.projectIdentifier} className={`form-control form-control-lg ${!error.projectIdentifier ? "":"is-invalid"}`} name='projectIdentifier' placeholder="Unique Project ID" onChange={onChange}
                            disabled />
                        {error.projectIdentifier && (
                                    <div className="invalid-feedback">{error.projectIdentifier}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <textarea className={`form-control form-control-lg ${!error.description ? "":"is-invalid"}`} value={data.description} name='description' placeholder="Project Description" onChange={onChange}></textarea>
                        {error.description && (
                                    <div className="invalid-feedback">{error.description}</div>
                        )}
                    </div>
                    <h6>Start Date</h6>
                    <div className="form-group">
                        <input type="date" className="form-control form-control-lg" value={data.start_date} name="start_date" onChange={onChange}/>
                    </div>
                    <h6>Estimated End Date</h6>
                    <div className="form-group">
                        <input type="date" className="form-control form-control-lg" value={data.end_date} name="end_date" onChange={onChange}/>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default UpdateProject