import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newContact => axios.post(baseUrl, newContact).then(response => response.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

const update = (id, newContact) => axios.put(`${baseUrl}/${id}`, newContact).then(response => response.data)

export default {
    getAll,
    create,
    remove,
    update
}