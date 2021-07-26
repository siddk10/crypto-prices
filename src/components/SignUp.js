import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {FirebaseContext} from '../firebase/context'
const SignUp=()=>{
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
    
    const history=useHistory()
    const { firebase } = useContext(FirebaseContext)   
    
    const [email,setEmailAddress] = useState('')
    const [password,setPassword] =useState('')
    const [error,setError] = useState(null)
    const [firstName,setFirstName]=useState('')
    const isInvalid = firstName==='' || email==='' || password===''
    
    
  const handleSignUp = (event) => {
    event.preventDefault();
  
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) =>
      result.user
        .updateProfile({
          displayName: firstName,
          
        })
        .then(() => {
          history.push('./home');
        })
    )
    .catch((error) => {
      setFirstName('');
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    });
  }



    return(
        <div> 
            <Link to="/" style={head} class="ui header">Crypto Prices</Link>
           
            <form class=" aligned ui  form" onSubmit={handleSignUp} method="POST" > 
            <h4 style={label} class="ui dividing header">Sign Up</h4>
            {error && <div style={label} >{error}</div>}

                <div class="field">
                    <label style={label}>FirstName</label>
                    <input value={firstName} onChange={({target})=>{setFirstName(target.value)}} 
                    style={input} type="text" placeholder="Enter FirstName">

                    </input>
                </div>            
                <div class="field">
                    <label style={label}>Email</label>
                    <input  value={email} onChange={({target})=>{setEmailAddress(target.value)}} 
                    style={input} type="text" placeholder="Enter email">

                    </input>
                </div>
            
                <div class="field">
                    <label style={label}>Password</label>
                    <input  value={password} onChange={({target})=>setPassword(target.value)} 
                    style={input} type="password" placeholder="Enter password">

                    </input>
                </div>
                <button disabled={isInvalid} class="ui inverted teal button" type="submit">Submit</button>
                     </form>
           
            
    
        </div>
    )
}


export default SignUp