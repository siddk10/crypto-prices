import React,{useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../firebase/context';
import '../Form.css'
import { Link } from 'react-router-dom';
import Price from './Price'

import axios from 'axios'
const Binance=()=>{
  
  const { firebase } = useContext(FirebaseContext);
  
  const[term,setTerm]=useState('')
  const[flag,setFlag]=useState(false)
  const[price,setPrice]=useState('')

   const head={
    paddingTop: 20,
    paddingLeft:15,
    color:'#1ddec2',
    display:'block'
}
const padd={
  paddingLeft:15,
  paddingBottom:10
}
const col={
  color:'#1ddec2',
  paddingLeft:15
}
const input={
  width:300,
  height:40,
}
const but={
  
  marginLeft:15
}

const handleChange=(event)=>{
    
  setTerm(event.target.value)
  setFlag(false)

}



const onFormSubmit=(event)=>{
  event.preventDefault()
  if(term=="")
  {
    alert("Choose different option")
  }
  
  else{
    async function sendGetRequest() {
      try
      {
        
      const response=await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${term}`)
      
      const res=response.data.price
      console.log(res)
     axios.get('https://openexchangerates.org/api/latest.json?app_id=d3ea3a75284549979ab0bed526490d46')
        .then((respo)=>{console.log(respo)
                const inr=respo.data.rates.INR
                console.log(inr)
                if(res=="")
                {
                     setFlag(prev=>flag)
                }     
                else{
                    setFlag(prev=>!flag)
                    setPrice(res*inr)
            
                }
               
            })
          
          
        
      }
       catch(error){
         console.log(error)
       }
    }
    sendGetRequest()
       
   }
   
  
}

   

    return(
        <div>
           <p style={head} class="ui header">Crypto Prices</p>
          <div class="ui teal inverted menu">
  <Link to="/home" class="item" >
    Wazrix Prices
  </Link>
  <Link to="/binance" class="active item">
    Binance Prices
  </Link>
  <div class="right menu">
    <div class="ui teal button" onClick={() => firebase.auth().signOut()}>
      Logout
    </div>
  </div>
</div>

<h2 style={col}>Select Coin</h2>
<form  onSubmit={onFormSubmit} >
<div style={padd}>
  <select value={term} onChange=
  {handleChange} 
  style={input} 
  class="ui selection dropdown" >
      <option value=""  disabled>Coins</option>
      <option value="ETHUSDT">ETHUSDT</option>
      <option value="BTCUSDT">BTCUSDT</option>
      <option value="XRPUSDT">XRPUSDT</option>
     
      <option value="TRXUSDT">TRXUSDT</option>
      <option value="EOSUSDT">EOSUSDT</option>
      <option value="OMGUSDT">OMGUSDT</option>
      <option value="BATUSDT">BATUSDT</option>
      <option value="ZILUSDT">ZILUSDT</option>
      <option value="EOSUSDT">EOSUSDT</option>
</select>
</div>
<button  style={but} class="ui inverted teal button" type="submit">Submit</button>
 {flag && <Price price={price}   term={term}/>}


</form>



  
</div>

    )
}
export default Binance