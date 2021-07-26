import React,{useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../firebase/context';
import '../Form.css'
import { Link } from 'react-router-dom';
import Price from './Price';
import axios from 'axios'
const Home=()=>{
  
  const { firebase } = useContext(FirebaseContext);
  
  const[term,setTerm]=useState('')
  const[name,setName]=useState([])
  const[flag,setFlag]=useState(false)
  const[flagg,setFlagg]=useState(false)
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
let symbols=[]
useEffect(()=>{
  
  async function getSymbols(){
    let i;
    
    for(i=0;i<10;i++)
    {
     await axios.get('https://nitinr-cors.herokuapp.com/https://api.wazirx.com/uapi/v1/tickers/24hr')
      .then(response=>{
      
      const res=response.data[i].symbol
      setName(prev=>([...prev,res]))
      
         
      symbols.push(res)
      })
      
    }
    setFlagg(true)
       
     
  }
    
getSymbols();

},[])
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
        
      const response=await axios.get
      (`https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers/${term}`)
      
        
          
          const res=response.data.ticker.last
          
          
          if(res=="")
          {
            setFlag(prev=>flag)
          }     
          else{
            setFlag(prev=>!flag)
            setPrice(res)
            
          }
          

        
      }
       catch(error){
         console.log(error)
       }
    }
    sendGetRequest()
       
   }
   
  
}

let names=  name
let optionsList=names.map((n)=>
  
  <option  value={n} key={n}>{n}</option>
)

   


    return(
        <div>
           <p style={head} class="ui header">Crypto Prices</p>
          <div class="ui teal inverted menu">
  <Link to="/home" class="active item">
    Wazrix Prices
  </Link>
  <Link to="/binance" class=" item" >
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
      {optionsList}
</select>
</div>
<button disabled={!flagg} style={but} class="ui inverted teal button" type="submit">Submit</button>

{flag && <Price price={price}   term={term}/>}

</form>



  
</div>

    )
}
export default Home