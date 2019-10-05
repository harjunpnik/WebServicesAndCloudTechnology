import React, { useState, useEffect  } from 'react'
import EventService from '../services/event'
import Event from './Event'
import EventForm from './EventForm'
import {useField } from '../hooks/index'

const Events = () => {
    const [events, setEvents] = useState([])

    const newType = useField('text')
    const newDate = useField('text')
    const newTotalCost = useField('text')
    const newAddress = useField('text')
    const newInfo = useField('text')

    useEffect(() => {
        EventService
          .getAll()
          .then(response => {
            setEvents(response.data)
            //console.log(response.data)
          })
    }, [])

    // Adds new event
    const addEvent = (event) => {
        event.preventDefault()
        const eventObject = {
            type: newType.fields.value,
            date: newDate.fields.value,
            totalCost: newTotalCost.fields.value,
            address: newAddress.fields.value,
            info: newInfo.fields.value
        }
    
        //console.log(blogObject)
        EventService
          .create(eventObject)
          .then(data => {
            setEvents(events.concat(eventObject))
            newType.reset()
            newDate.reset()
            newTotalCost.reset()
            newAddress.reset()
            newInfo.reset()
          })
    }

        //  Delete player
    const deleteEvent = (event) => {
        if(window.confirm('Remove event ' + event.type + ' ' + event.date+ ' ?')){
            EventService
              .deleteEvent(event.id)
              .then( () => {
                setEvents(events.filter(e =>
                  e.id !== event.id
                ))
              })
              .catch(error => {
                console.log(error)
              })
          
        }
    
    }

    //maps events to table
    const eventRows = () => events.map(e => 
        <Event 
        key={e.id} 
        event={e} 
        remove={() => deleteEvent(e)} 
        />
    )
   
    return(
        <div>
        <div id="resp-table">
            <div id="resp-table-caption">Events</div>
            
            <div id="resp-table-header">
                <div class="table-header-cell">Type</div>
                <div class="table-header-cell">Date</div>
                <div class="table-header-cell">Total Cost</div>
                <div class="table-header-cell">Address</div>
                <div class="table-header-cell">Info</div>
                <div class="table-header-cell"></div>
            </div>

            <div id="resp-table-body">
                {eventRows()}
            </div>

        </div>

        <div id='centerDiv'>
                <EventForm
                onSubmit={addEvent} 
                newType={newType.fields}
                newDate={newDate.fields}
                newTotalCost={newTotalCost.fields}
                newAddress={newAddress.fields}
                newInfo={newInfo.fields}
                />
        </div>
                
    </div>
    )
}

export default Events