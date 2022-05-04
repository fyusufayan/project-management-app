import React from 'react'
import ProjectTask from './projectTasks/ProjectTask'

const Backlog = (props) => {

    const{project_tasks}=props

    let todoItems=[]
    let inProgressItems=[]
    let doneItems=[]

    for(let i=0;i<project_tasks.length;i++){
        if(project_tasks[i].status==="TO_DO"){
            todoItems.push(project_tasks[i])
        }
        if(project_tasks[i].status==="IN_PROGRESS"){
            inProgressItems.push(project_tasks[i])
        }
        if(project_tasks[i].status==="DONE"){
            doneItems.push(project_tasks[i])
        }
    }

  return (
        <div className="container">
            <div className="row">

                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>

                    {todoItems.map(todoItem=>(
                        <ProjectTask key={todoItem.id} project_task={todoItem}/>
                    ))}
                </div>

                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>

                    {inProgressItems.map(inProgressItem=>(
                        <ProjectTask key={inProgressItem.id} project_task={inProgressItem}/>
                    ))}
                </div>

                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>

                    {doneItems.map(doneItem=>(
                        <ProjectTask key={doneItem.id} project_task={doneItem}/>
                    ))}
                </div>

            </div>
        </div>

  )
}

export default Backlog