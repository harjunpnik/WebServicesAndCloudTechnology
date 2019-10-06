import React from 'react'

const PlayerForm = ({onSubmit, newFirstName, newLastName, newEmail, newPhone, newPlayerNr, newPosition}) => {
    return(
        <form onSubmit={onSubmit}>
        <h2>Add new Player</h2>
        <div>
          <label id="inputLable">First Name</label> 
          <input 
            id="textInput"
            {...newFirstName}
           />
        </div>
        <div>
          <label id="inputLable">Last Name</label> 
          <input
            id="textInput"
            {...newLastName}
           />
        </div>
        <div>
          <label id="inputLable">Email</label> 
          <input
            id="textInput"
            {...newEmail}
           />
        </div>
        <div>
          <label id="inputLable">Phone number</label> 
          <input
            id="textInput"
            {...newPhone}
           />
        </div>
        <div>
          <label id="inputLable">Player Nr</label> 
          <input
            id="textInput"
            {...newPlayerNr}
           />
        </div>
        <div>
          <label id="inputLable">Position</label> 
          <input
            id="textInput"
            {...newPosition}
           />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default PlayerForm