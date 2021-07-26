import React from 'react'
import Form from './components/Form'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Binance from './components/Binance'
import './Form.css'
import {
    BrowserRouter as Router,
    Switch,Route
    
  } from "react-router-dom";
import { IsUserRedirect,ProtectedRoute} from './helpers/routes'

import useAuthListener from './helpers/use-auth-listener'

const App=()=>{

    const { user }=useAuthListener();
    
    return(
        
        <div class=" form">
            
            <Router>
             <Switch>
                
             <IsUserRedirect user={user} loggedInPath='/home' path='/' exact>
                     <Form  />
                </IsUserRedirect>
                <ProtectedRoute exact user={user} path='/home'>
                    <Home />
                </ProtectedRoute>
                <ProtectedRoute exact user={user} path='/binance'>
                    <Binance />
                </ProtectedRoute>
                 

                <IsUserRedirect user={user} loggedInPath='/home' path='/signup' exact>
                    <SignUp />
                </IsUserRedirect>

 
                


                
             </Switch>
            </Router>
        </div>
    )
}
export default App