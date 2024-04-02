import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { SOCKET_EVENT_UPDATE_BOARD, socketService } from './socket.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'
const BASE_URL = 'board'

export const boardService = {
    query,
    getCityById,
    update,
    save,
    remove,
    getCityByName
}

// General Update function
async function update(city) {
    return await storageService.put(STORAGE_KEY, city)
    // let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
}
// Board functions
async function query() {
    return httpService.get(BASE_URL, null)
    // return await storageService.query(STORAGE_KEY)
}

async function getCityByName(name) {
    let cities = await query()
    let city = cities.find(city => city.cityDetails.LocalizedName === name)
    return city
}

async function getCityById(id) {
    let cities = await query()
    let city = cities.find(city => city._id === id)
    return city
}

async function save(cities) {
    // return await httpService.post(BASE_URL, board)
    return await storageService.post(STORAGE_KEY, cities)
}

async function remove(cityId) {
    // return httpService.delete(`${BASE_URL}/${boardId}`, boardId)
    return await storageService.remove(STORAGE_KEY, cityId)
}