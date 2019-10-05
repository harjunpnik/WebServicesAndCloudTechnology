import React, { useState } from 'react'
import './styles/table.css'

const Registration = ({registration, remove}) => {
    return(
        <div class="resp-table-row">
            <div class="table-body-cell">{registration.firstName}</div>
            <div class="table-body-cell">{registration.lastName}</div>
            <div class="table-body-cell">{registration.eventName}</div>
            <div class="table-body-cell">{registration.eventDate}</div>
            <div class="table-body-cell"><button onClick={remove}>Delete</button></div>
        </div>
    )
}

export default Registration