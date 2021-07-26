import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {firebase} from './firebase/firebase.prod'
import {FirebaseContext} from './firebase/context'

ReactDOM.render(
<>
<FirebaseContext.Provider value={{firebase}}>
    <App/>
</FirebaseContext.Provider>
</> ,
document.getElementById("root"))