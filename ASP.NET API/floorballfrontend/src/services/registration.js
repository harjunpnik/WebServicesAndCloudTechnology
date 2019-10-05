import axios from 'axios'
const baseUrl = 'https://floorballnetapi.azurewebsites.net/api/registrations'
const urlForInfo = 'https://floorballnetapi.azurewebsites.net/api/registrationinfo'

const getAll = () => {
    return axios.get(urlForInfo)
}
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const deleteRegistration = (id) => {
    return axios.delete(baseUrl + "/" + id)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    deleteRegistration: deleteRegistration,
    update: update
}