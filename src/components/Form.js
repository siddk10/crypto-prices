import React, { useState,useContext } from 'react'
import '../Align.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {FirebaseContext} from '../firebase/context'

const Form=()=>{
    const input={
        width:300,
        height:30,
        
       
    }
    const label={
        
        color:'#1ddec2',
        textAlign:'left'
    }
    const head={
        paddingTop: 20,
        paddingLeft:40,
        color:'#1ddec2',
        display:'block'
    }
    const [email,setEmailAddress] = useState('')
    const [password,setPassword] =useState('')
    const [error,setError] = useState(null)
    const isInvalid =  email==='' || password===''
    
    const history=useHistory()
    const { firebase } = useContext(FirebaseContext)   
    
    const handleSignIn=(event)=>{
            event.preventDefault()
            
              return firebase
      .auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('./home');
      })
      .catch((error) => {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
    }

    return(
        <div> 
            <Link to="/" style={head} class="ui header">Crypto Prices</Link>
           
            <form onSubmit={handleSignIn} method="POST" class=" aligned ui  form"> 
            <h4  style={label} class="ui dividing header">Sign In</h4>
            {error && <div style={label} >{error}</div>}
                <div class="field">
                    <label style={label}>Email</label>
                    <input value={email} onChange={({target})=>{setEmailAddress(target.value)}} 
                     style={input} type="text" placeholder="Enter email">

                    </input>
                </div>
            
                <div class="field">
                    <label style={label}>Password</label>
                    <input value={password} onChange={({target})=>{setPassword(target.value)}} 
                    style={input} type="password" placeholder="Enter password">

                    </input>
                </div>

                <button disabled={isInvalid} class="ui inverted teal button" type="submit">Submit</button>
                <Link to="/signup" class="ui inverted teal button">Sign up</Link>            
            </form>
           
            
    
        </div>
    )
}
export default Form
