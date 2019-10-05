import React, { useState, useEffect  } from 'react'
import costServices from '../services/costs'
import Cost from './Cost'

const Costs = () => {
    const [costs, setCosts] = useState([])

    useEffect(() => {
        costServices
          .getAll()
          .then(response => {
            setCosts(response.data)
          })
    }, [])

        //maps players to table
        const costRows = () => costs.map(c => 
            <Cost 
            key={c.id} 
            cost={c} 
            />
        )
   const padding = {paddingLeft: 400, paddingRight: 400}
    return(
        <div style={padding}>
            <div  id="resp-table">
                <div id="resp-table-caption">Costs</div>
                
                <div id="resp-table-header">
                    <div class="table-header-cell">First name</div>
                    <div class="table-header-cell">Last name</div>
                    <div class="table-header-cell">Cost</div>
                </div>

                <div id="resp-table-body">
                    {costRows()}
                </div>

            </div>
                    
        </div>
    )
}

export default Costs