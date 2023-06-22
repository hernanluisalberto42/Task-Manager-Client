import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/authentication/authState';
import tokenAuth from './config/token';
import RoutePrivate from './components/routes/RoutePrivate';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}


function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <BrowserRouter>
              <Routes>                  
                    {/* <Route path="/projects" element={<Projects/>} /> */}
                    <Route
                        path="/projects"
                        element={
                          <RoutePrivate>
                             <Projects/>
                          </RoutePrivate>
                        }
                      />
                    <Route path="/" element={<Login/>} />
                    <Route path="/new-account" element={<NewAccount/>} />                                    
              </Routes>       
            </BrowserRouter>
          </AuthState>
        </AlertState>  
      </TaskState> 
    </ProjectState> 
  );
}

export default App;
