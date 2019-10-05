import React, { useState } from 'react'
import './styles/table.css'
//import {useField } from '../hooks/index'
import playerService from '../services/player'
//import { tsConstructorType } from '@babel/types'

const Player = ({player, remove}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }

    const id = player.id
    const [editFirstName, setEditFirstName] = useState(player.firstName)
    const [editLastName, setEditLastName] = useState(player.lastName)
    const [editEmail, setEditEmail] = useState(player.email)
    const [editPhone, setEditPhone] = useState(player.phone)
    const [editPlayerNr, setEditPlayerNr] = useState(player.playerNr)
    const [editPosition, setEditPosition] = useState(player.position)

    const handleFirstNameChange = (event) => {setEditFirstName(event.target.value)}
    const handleLastNameChange = (event) => {setEditLastName(event.target.value)}
    const handleEmailChange = (event) => {setEditEmail(event.target.value)}
    const handlePhoneChange = (event) => {setEditPhone(event.target.value)}
    const handlePlayerNrChange = (event) => {setEditPlayerNr(event.target.value)}
    const handlePositionChange = (event) => {setEditPosition(event.target.value)}

    //  Update player
    const updatePlayer = (event) => {
        event.preventDefault()
        console.log(editFirstName.fields)
        const playerObject = {
            firstName: editFirstName,
            lastName: editLastName,
            email: editEmail,
            phone: editPhone,
            playerNr: editPlayerNr,
            position: editPosition
        }
        console.log(playerObject)
    
        playerService
          .update(id, playerObject)
          .then(
            window.location.reload()
          )
          .catch (error => {
            console.log(error)
          })
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
            <div class="table-body-cell"><button onClick={(event) => toggleVisibility(event)}>Edit</button> <button onClick={remove}>Delete</button></div>
        </div>
        <form style={showWhenVisible} onSubmit={updatePlayer} class="resp-table-row">
            <div class="table-body-cell"><input value={editFirstName} onChange={handleFirstNameChange} /></div>
            <div class="table-body-cell"><input value={editLastName} onChange={handleLastNameChange}/></div>
            <div class="table-body-cell"><input value={editEmail} onChange={handleEmailChange}/></div>
            <div class="table-body-cell"><input value={editPhone} onChange={handlePhoneChange}/></div>
            <div class="table-body-cell"><input value={editPlayerNr} onChange={handlePlayerNrChange}/></div>
            <div class="table-body-cell"><input value={editPosition} onChange={handlePositionChange}/></div>
            <div class="table-body-cell"><button type="submit">Save</button> <button onClick={(event) => toggleVisibility(event)}>Cancel</button></div>
        </form>
        </>
    )
}

export default Player