import React,{ useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import CreateProjectButton from './project/CreateProjectButton'
import ProjectItem from './project/ProjectItem'
import { getProjects } from '../actions/projectActions'


const Dashboard = () => {

  const dispatch=useDispatch()
  const projects=useSelector(state=>state.projects.projects)


  const [isLoaded,setIsLoaded]=useState(false)

  if(!isLoaded){
    dispatch(getProjects())
    setIsLoaded(true)
  }


  return (
    <div className="projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Projects</h1>
                    <br />

                    <CreateProjectButton />
                    <br />
                    <hr />
                    {projects.map(project=>(
                      <ProjectItem key={project.id} project={project} />
                    ))}
                    

                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard