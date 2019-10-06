import React, { useState } from 'react'
import './styles/table.css'
import EventService from '../services/event'

const Event = ({event, remove}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }

    const id = event.id
    const [editType, setEditType] = useState(event.type)
    const [editDate, setEditDate] = useState(event.date)
    const [editTotalCost, setEditTotalCost] = useState(event.totalCost)
    const [editAddress, setEditAddress] = useState(event.address)
    const [editInfo, setEditInfo] = useState(event.info)

    const handleTypeChange = (event) => {setEditType(event.target.value)}
    const handleDateChange = (event) => {setEditDate(event.target.value)}
    const handleTotalCostChange = (event) => {setEditTotalCost(event.target.value)}
    const handleAddressChange = (event) => {setEditAddress(event.target.value)}
    const handleInfoChange = (event) => {setEditInfo(event.target.value)}

    //  Update Event
    const updateEvent = (event) => {
        event.preventDefault()
        const eventObject = {
            type: editType,
            date: editDate,
            totalCost: editTotalCost,
            address: editAddress,
            info: editInfo
        }
        //console.log(id)
        //console.log(eventObject)
    
        EventService
          .update(id, eventObject)
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
            <div class="table-body-cell">{event.type}</div>
            <div class="table-body-cell">{event.date}</div>
            <div class="table-body-cell">{event.totalCost} €</div>
            <div class="table-body-cell">{event.address}</div>
            <div class="table-body-cell">{event.info}</div>
            <div class="table-body-cell"><button onClick={(event) => toggleVisibility(event)}>Edit</button> <button onClick={remove}>Delete</button></div>
        </div>
        <form style={showWhenVisible} onSubmit={updateEvent} class="resp-table-row">
            <div class="table-body-cell"><input value={editType} onChange={handleTypeChange} /></div>
            <div class="table-body-cell"><input value={editDate} onChange={handleDateChange}/></div>
            <div class="table-body-cell"><input value={editTotalCost} onChange={handleTotalCostChange}/></div>
            <div class="table-body-cell"><input value={editAddress} onChange={handleAddressChange}/></div>
            <div class="table-body-cell"><input value={editInfo} onChange={handleInfoChange}/></div>
            <div class="table-body-cell"><button type="submit">Save</button> <button onClick={(event) => toggleVisibility(event)}>Cancel</button></div>
        </form>
        </>
    )
}

export default Event