import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'weatherDB'
const BASE_URL = 'weather'
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const citiesService = {
    query,
    getCityById,
    update,
    save,
    remove,
    getCityByName,
    getAutoComplete,
    getCurrConditions,
    get5DaysForecast,
    getWeatherImage
}

async function update(city) {
    return await storageService.put(STORAGE_KEY, city)
    // let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
}
async function query() {
    // return httpService.get(BASE_URL, null)
    return await storageService.query(STORAGE_KEY)
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

function getWeatherImage(weatherText) {
    const lowerCaseTxt = weatherText.toLowerCase()
    if (lowerCaseTxt.includes('sun') && !lowerCaseTxt.includes('cloud')) {
        return "https://freepngdownload.com/image/thumb/sun-png-free-download-10.png"
    } else if (lowerCaseTxt.includes('cloud') && !lowerCaseTxt.includes('sun') || lowerCaseTxt.includes('rain')) {
        return 'https://www.transparentpng.com/thumb/weather-report/cloud-rain-water-lightning-nature-images-19.png'
    }
    else if (lowerCaseTxt.includes('cloud') && lowerCaseTxt.includes('sun')) {
        return 'https://freepngimg.com/thumb/categories/2275.png'
    }
    else {
        return 'https://freepngimg.com/thumb/categories/2275.png'
    }
}

//API Calls functions
async function getAutoComplete(text) {
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${VITE_WEATHER_API_KEY}&q=${text}`)
        return res.data
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

async function getCurrConditions(locationKey) {
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${VITE_WEATHER_API_KEY}`)
        return res.data
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

async function get5DaysForecast(locationKey) {
    try {
        const res = await axios.get(` http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${VITE_WEATHER_API_KEY}&metric=true`)
        return res.data
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}
