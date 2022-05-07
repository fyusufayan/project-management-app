import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Backlog from './Backlog';
import { useDispatch,useSelector } from 'react-redux'
import { getBacklog } from '../../actions/backlogActions';


const ProjectBoard = (props) => {

    const {id}=props.match.params;

    const dispatch=useDispatch()

    const project_tasks=useSelector(state=>state.backlog.project_tasks)
    const error=useSelector(state=>state.error.errmessage)

    const boardAlgorithm=(error,project_tasks)=>{
        if(project_tasks.length<1){
            if(error.projectNotFound){
                return(
                    <div className='alert alert-danger text-center' role="alert">
                        {error.projectNotFound}
                    </div>
                )
            }else if(error.projectIdentifier){
                return(
                    <div className='alert alert-danger text-center' role="alert">
                        {error.projectIdentifier}
                    </div>
                )
            }else{
                return (<div className='alert alert-info text-center' role="alert">
                    No Project Tasks on this board
                </div>)
            }
        }else{
            return <Backlog project_tasks={project_tasks}/>
        }
    }

    const [isLoaded,setIsLoaded]=useState(false)

    if(!isLoaded){
        dispatch(getBacklog(id))
        setIsLoaded(true)
    }

    
  return (
    <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />

        {boardAlgorithm(error, project_tasks)}
    </div>
  )
}

export default ProjectBoard