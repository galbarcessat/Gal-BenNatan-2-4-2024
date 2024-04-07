import axios from 'axios'
import { storageService } from './async-storage.service.js'
import Sun from '../assets/imgs/Sun.png'
import CloudsAndSun from '../assets/imgs/CloudsAndSun.png'
import Rain from '../assets/imgs/Rain.png'

const STORAGE_KEY = 'weatherDB'
const BASE_URL = 'weather'
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const VITE_API_NINJAS_API_KEY = import.meta.env.VITE_API_NINJAS_API_KEY;

export const citiesService = {
    query,
    getCityById,
    update,
    save,
    remove,
    getCityByKey,
    getAutoComplete,
    getCurrConditions,
    get5DaysForecast,
    getWeatherImage,
    toggleIsFavorite,
    getFavoriteCities,
    getCityByLatLong,
    getLongLat
}

async function update(city) {
    return await storageService.put(STORAGE_KEY, city)
    // let updatedBoard = await httpService.put(`${BASE_URL}/${boardId}`, board)
}
async function query() {
    // return httpService.get(BASE_URL, null)
    return await storageService.query(STORAGE_KEY)
}

async function getCityByKey(Key) {
    let cities = await query()
    let city = cities.find(city => city.Key === Key)
    return city
}

async function getCityById(id) {
    let cities = await query()
    let city = cities.find(city => city._id === id)
    return city
}

async function save(city) {
    // return await httpService.post(BASE_URL, board)
    return await storageService.post(STORAGE_KEY, city)
}

async function remove(cityId) {
    // return httpService.delete(`${BASE_URL}/${boardId}`, boardId)
    return await storageService.remove(STORAGE_KEY, cityId)
}

function getWeatherImage(weatherText) {
    const lowerCaseTxt = weatherText.toLowerCase()
    if (lowerCaseTxt.includes('sun') && !lowerCaseTxt.includes('cloud')) {
        return Sun
    } else if (lowerCaseTxt.includes('shower') || lowerCaseTxt.includes('rain')) {
        return Rain
    }
    else if (lowerCaseTxt.includes('cloud') && lowerCaseTxt.includes('sun')) {
        return CloudsAndSun
    }
    else {
        return CloudsAndSun
    }
}

async function toggleIsFavorite(city) {
    const cityFromStorage = await getCityByKey(city.Key)
    if (cityFromStorage) {
        delete cityFromStorage['isFavorite']
        await remove(cityFromStorage._id)
        return cityFromStorage
    } else {
        city.isFavorite = true
        return await save(city)
    }
}

async function getFavoriteCities() {
    return await query()
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

async function getCityByLatLong(position) {
    const long = position.coords.longitude
    const lat = position.coords.latitude
    try {
        const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${VITE_WEATHER_API_KEY}&q=${lat},${long}`)
        // console.log('res:', res.data)
        const city = {
            Version: data.Version,
            Key: data.Key,
            Type: data.Type,
            Rank: data.Rank,
            LocalizedName: data.LocalizedName,
            Country: data.Country,
            AdministrativeArea: data.AdministrativeArea
        }
        return city
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

async function getLongLat(city, country) {
    try {
        const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`
        const headers = {
            'X-Api-Key': VITE_API_NINJAS_API_KEY
        }

        const { data } = await axios.get(url, { headers })
        const LongLat = { lat: data[0].latitude, lng: data[0].longitude }
        return LongLat
    } catch (error) {
        console.log('error:', error)
        throw error
    }

}