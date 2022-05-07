
import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/securityActions'
import { useDispatch,useSelector } from 'react-redux'


const Header = (props) => {
    
    const dispatch=useDispatch()

    const {user,validToken}=useSelector(state=>state.security)


    const logoutPROPS=()=>{
        dispatch(logout())
        window.location.href="/"
        // props.history.push('/login')
    }


    const userIsAuthenticated=(
        <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link ">
                        <i className='fas fa-user-circle mr-1'></i>
                        {user.fullName}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/logout" className="nav-link" onClick={logoutPROPS}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )

    const userIsNotAuthenticated=(
        <div className="collapse navbar-collapse" id="mobile-nav">

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link ">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    )

    let headerLinks;

    if(validToken && user){
        headerLinks=userIsAuthenticated
    }else{
        headerLinks=userIsNotAuthenticated
    }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
            <Link className="navbar-brand" to="/">
                Personal Project Management Tool
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon" />
            </button>

            {headerLinks}

        </div>
    </nav>
  )
}

export default Header