import './App.css'
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import AddProject from './components/project/AddProject';
import {Provider} from 'react-redux'
import store from './store';
import UpdateProject from './components/project/UpdateProject';
import ProjectBoard from './components/projectBoard/ProjectBoard'
import AddProjectTask from './components/projectBoard/projectTasks/AddProjectTask';
import UpdateProjectTask from './components/projectBoard/projectTasks/UpdateProjectTask';
import Landing from './components/layout/Landing';
import Register from './components/userManagement/Register';
import Login from './components/userManagement/Login';
import jwt_decode from 'jwt-decode'
import setJWTToken from './securityUtils/setJWTToken';
import {securityActions} from './reducers/securitySlice'
import {SET_CURRENT_USER} from './actions/types'
import { logout } from './actions/securityActions';
import SecureRoute from './securityUtils/SecureRoute';


const jwtToken=localStorage.jwtToken

if(jwtToken){
  setJWTToken(jwtToken)
  const decoded_jwtToken=jwt_decode(jwtToken)
  store.dispatch(securityActions.setcurrentuserfunc({
    type:SET_CURRENT_USER,
    token:decoded_jwtToken
  }))

  const currentTime=Date.now()/1000

  if(decoded_jwtToken.exp<currentTime){
    store.dispatch(logout())
    // window.location.href="/"
    // window.location.href("/")
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={Landing}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>

          <Switch>
            <SecureRoute exact path="/dashboard" component={Dashboard}/>
            <SecureRoute exact path="/addProject" component={AddProject}/>
            <SecureRoute exact path="/updateProject/:id" component={UpdateProject}/>
            <SecureRoute exact path="/projectBoard/:id" component={ProjectBoard}/>
            <SecureRoute exact path="/addProjectTask/:id" component={AddProjectTask}/>
            <SecureRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}/>
          </Switch>

        </div>
      </Router>
    </Provider>
  );
}

export default App;
