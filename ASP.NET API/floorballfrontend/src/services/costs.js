import axios from 'axios'
const baseUrl = 'https://floorballnetapi.azurewebsites.net/api/playercosts'

const getAll = () => {
    return axios.get(baseUrl)
}

export default {
    getAll: getAll
}