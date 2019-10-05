import React from 'react'
import './styles/table.css'

const Cost = ({cost}) => {
    return(
        <div class="resp-table-row">
            <div class="table-body-cell">{cost.firstName}</div>
            <div class="table-body-cell">{cost.lastName}</div>
            <div class="table-body-cell">{cost.totalCost} €</div>
        </div>
    )
}

export default Cost