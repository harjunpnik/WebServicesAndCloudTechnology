import React, { useState } from 'react'
import './styles/table.css'

const Player = ({player}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }

    return(
        <>
        <div style ={hideWhenVisible} class="resp-table-row">
            <div class="table-body-cell">{player.firstName}</div>
            <div class="table-body-cell">{player.lastName}</div>
            <div class="table-body-cell">{player.email}</div>
            <div class="table-body-cell">{player.phone}</div>
            <div class="table-body-cell">{player.playerNr}</div>
            <div class="table-body-cell">{player.position}</div>
            <div class="table-body-cell"><button onClick={(event) => toggleVisibility(event)}>Edit</button> <button onClick={() => console.log("delete")}>Delete</button></div>
        </div>
        <form style={showWhenVisible} onSubmit={""} class="resp-table-row">
            <div class="table-body-cell"><input value={player.firstName}/></div>
            <div class="table-body-cell"><input value={player.lastName}/></div>
            <div class="table-body-cell"><input value={player.email}/></div>
            <div class="table-body-cell"><input value={player.phone}/></div>
            <div class="table-body-cell"><input value={player.playerNr}/></div>
            <div class="table-body-cell"><input value={player.position}/></div>
            <div class="table-body-cell"><button type="submit">Save</button> <button onClick={(event) => toggleVisibility(event)}>Cancel</button></div>
        </form>
        </>
    )
}

export default Player