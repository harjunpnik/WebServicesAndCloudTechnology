import axios from 'axios'
const baseUrl = 'https://floorballrestapi.azurewebsites.net/api/events'

const getAll = () => {
    return axios.get(baseUrl)
}
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteEvent = (id) => {
    return axios.delete(baseUrl + "/" + id)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    deleteEvent: deleteEvent,
    update: update
}