import React, { useState, useEffect  } from 'react'
import playerService from '../services/player'
import Player from './Player'
import './styles/table.css'
import PlayerForm from './PlayerForm'
import {useField } from '../hooks/index'

const Players = () => {
    const [players, setPlayers] = useState([])
    const newFirstName = useField('text')
    const newLastName = useField('text')
    const newEmail = useField('text')
    const newPhone = useField('text')
    const newPlayerNr = useField('text')
    const newPosition = useField('text')
    


    //Fetches data from api when user switches to players page
    useEffect(() => {
        playerService
          .getAll()
          .then(response => {
            setPlayers(response.data)
          })
    }, [])

    //  Add Player
    const addPlayer = (event) => {
        event.preventDefault()
        const playerObject = {
            firstName: newFirstName.fields.value,
            lastName: newLastName.fields.value,
            email: newEmail.fields.value,
            phone: newPhone.fields.value,
            playerNr: newPlayerNr.fields.value,
            position: newPosition.fields.value

        }
    
        //console.log(blogObject)
        playerService
          .create(playerObject)
          .then(data => {
            setPlayers(players.concat(playerObject))
            newFirstName.reset()
            newLastName.reset()
            newEmail.reset()
            newPhone.reset()
            newPlayerNr.reset()
            newPosition.reset()
          })
    }

    //  Delete player
    const deletePlayer = (player) => {
        if(window.confirm('Remove player ' + player.firstName + ' ' + player.lastName+ ' ?')){
            playerService
              .deletePlayer(player.id)
              .then( () => {
                setPlayers(players.filter(p =>
                  p.id !== player.id
                ))
              })
              .catch(error => {
                console.log(error)
              })
          
        }
    
    }


    //maps players to table
    const playerRows = () => players.map(p => 
        <Player 
        key={p.id} 
        player={p} 
        remove={() => deletePlayer(p)} 
        />
    )

    return(
        <div>
            <div id="resp-table">
                <div id="resp-table-caption">Players</div>
                
                <div id="resp-table-header">
                    <div class="table-header-cell">First name</div>
                    <div class="table-header-cell">Last name</div>
                    <div class="table-header-cell">Email</div>
                    <div class="table-header-cell">Phone</div>
                    <div class="table-header-cell">Player Nr</div>
                    <div class="table-header-cell">Position</div>
                    <div class="table-header-cell"></div>
                </div>

                <div id="resp-table-body">
                    {playerRows()}
                </div>

            </div>

            <div id='centerDiv'>
                <PlayerForm
                onSubmit={addPlayer} 
                newFirstName={newFirstName.fields} 
                newLastName={newLastName.fields} 
                newEmail={newEmail.fields} 
                newPhone={newPhone.fields} 
                newPlayerNr={newPlayerNr.fields}
                newPosition={newPosition.fields}

                />
            </div>
                    
        </div>
    )
}

export default Players
