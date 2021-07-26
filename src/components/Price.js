import React from 'react'

const tab={
    marginLeft:15,
    marginTop:20,
    width:50
}

const Price=({term,price})=>{

return(
<div style={tab} >
<table class="ui single line table" >
  <thead>
    <tr><th>CryptoCurrency</th>
    <th>Last Price(In Rs.)</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>
        <h4 >
           <div >
            {term}
          </div>
      </h4></td>
      <td>
        {price}
      </td>
    </tr>

  </tbody>
</table>
    
</div>
)
}
export default Price