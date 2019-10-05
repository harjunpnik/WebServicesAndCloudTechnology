import React, { useState } from 'react'

const EventForm = ({onSubmit, newType, newDate, newTotalCost, newAddress, newInfo}) => {
    return(
        <form onSubmit={onSubmit}>
        <h2>Add new Event</h2>
        <div>
          <label id="inputLable">Type</label> 
          <input 
            id="textInput"
            {...newType}
           />
        </div>
        <div>
          <label id="inputLable">Date</label> 
          <input
            id="textInput"
            {...newDate}
           />
        </div>
        <div>
          <label id="inputLable">Total Cost</label> 
          <input
            id="textInput"
            {...newTotalCost}
           />
        </div>
        <div>
          <label id="inputLable">Address</label> 
          <input
            id="textInput"
            {...newAddress}
           />
        </div>
        <div>
          <label id="inputLable">Info</label> 
          <input
            id="textInput"
            {...newInfo}
           />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default EventForm