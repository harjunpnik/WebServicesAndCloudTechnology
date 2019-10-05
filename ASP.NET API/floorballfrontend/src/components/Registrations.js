import React, { useState, useEffect  } from 'react'
import RegistrationService from '../services/registration'
import Registration from './Registration'
import EventService from '../services/event'
import RegistrationFormOption from './RegistrationFormOption'
import playerService from '../services/player'

const Registrations = () => {
    const [registrationInfos, setRegistrationInfos] = useState([])
    const [events, setEvents] = useState([])
    const [players, setPlayers] = useState([])

    const [eventIdValue, setEventIdValue] = useState([])
    const [playerIdValue, setPlayerIdValue] = useState([])


    useEffect(() => {
        RegistrationService
          .getAll()
          .then(response => {
            setRegistrationInfos(response.data)
          })

          EventService
          .getAll()
          .then(response => {
            setEvents(response.data)
          })

          playerService
          .getAll()
          .then(response => {
            setPlayers(response.data)
          })

    }, [])


    // Delete registration
    const deleteRegistration = (registration) => {
        if(window.confirm('Remove registration ' + registration.firstName + ' ' + registration.lastName  +' ' + registration.eventName+ ' ?')){
            RegistrationService
              .deleteRegistration(registration.id)
              .then( () => {
                setRegistrationInfos(registrationInfos.filter(r =>
                  r.id !== registration.id
                ))
              })
              .catch(error => {
                console.log(error)
              })
          
        }
    
    }

    //maps registrations to table
    const registrationRows = () => registrationInfos.map(r => 
        <Registration 
        key={r.id} 
        registration={r} 
        remove={() => deleteRegistration(r)} 
        />
    )

    //maps event id
    const eventIdRows = () => events.map(e => <RegistrationFormOption idValue={e.id} name={e.type + ': ' + e.info + ' ' + e.date} />)
    //maps event id
    const playerIdRows = () => players.map(p => <RegistrationFormOption idValue={p.id} name={p.playerNr + ': ' + p.firstName + ' ' + p.lastName} />)

    const handleEventIdChange = (event) => {setEventIdValue(event.target.value)}
    const handlePlayerIdChange = (event) => {setPlayerIdValue(event.target.value)}

    //Adds new registration
    const addRegistration = (event) => {
        event.preventDefault()
        const registrationObject = {
            playerId: playerIdValue,
            eventId: eventIdValue
        }
    
        //console.log(blogObject)
        RegistrationService
          .create(registrationObject)
          .then(data => {
            window.location.reload()
          })
    }
   
    return(
        <div>
        <div id="resp-table">
            <div id="resp-table-caption">Events</div>
            
            <div id="resp-table-header">
                <div class="table-header-cell">First Name</div>
                <div class="table-header-cell">Last Name</div>
                <div class="table-header-cell">Event Name</div>
                <div class="table-header-cell">Event Date</div>
                <div class="table-header-cell"></div>
            </div>

            <div id="resp-table-body">
                {registrationRows()}
            </div>

        </div>

        <div id='centerDiv'>
            <h3>Add new registration</h3>
            <form onSubmit={addRegistration}>
                <select value={eventIdValue} onChange={handleEventIdChange}>
                    {eventIdRows()}
                </select>
                <select value={playerIdValue} onChange={handlePlayerIdChange}>
                    {playerIdRows()}
                </select>
                <input type="submit" value="Submit" />
            </form>
        </div>
                
    </div>
    )
}

export default Registrations