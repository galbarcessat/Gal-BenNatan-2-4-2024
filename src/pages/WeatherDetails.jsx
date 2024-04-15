import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { citiesService } from '../services/cities.service.local';
import { CityDetails } from '../cmps/CityDetails';
import { setFavoriteCity } from '../store/actions/weather.action';
import { utilService } from '../services/util.service';

// THINGS TO FIX 
// -change to ES6 convention - FIXED 
// -clear all console logs - FIXED 
// -Use SASS variables for colors - FIXED.

// -UseRef for debounce - TODO 
// -fix errors from MUI Autocomplete - TODO
// -dont use Redux for FavoriteCities instead use navigate and useParams with id - TODO , using redux saves api calls..

// -Fix UseEffects look at how is getCityOptions activated - ?
// -fix components architectural - ?
// -Use Typescript ?
// -סיפריות שלא בשימוש? לא ראיתי


export function WeatherDetails() {
    const [searchBy, setSearchBy] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)
    const [cityOptions, setCityOptions] = useState([])
    const [currConditions, setCurrConditions] = useState(null)
    const [fiveDaysForecaset, setFiveDaysForecaset] = useState(null)
    const savedFavoriteCity = useSelector(state => state.weatherModule.favoriteCity)

    useEffect(()=>{
        debouncedGetCityOptions()
    },[searchBy])

    useEffect(() => {
        getWeather()
    }, [selectedCity])

    useEffect(() => {
        if (savedFavoriteCity) setSelectedCity(savedFavoriteCity)
    }, [savedFavoriteCity])

    const debouncedGetCityOptions = utilService.debounce(getCityOptions, 300)

    async function getCityOptions() {
        try {
            if (searchBy) {
                const cities = await citiesService.getAutoComplete(searchBy)
                setCityOptions(cities)
            }
        } catch (error) {
            showErrorMsg(`Error fetching data for city options`)
        }
    }

    async function setDefaultCity() {
        if (!selectedCity && !savedFavoriteCity) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const city = await citiesService.getCityByLatLong(position)
                    setSelectedCity(city)
                })
            } else {
                showErrorMsg('geolocation IS NOT available , default is Tel Aviv')
                setSelectedCity({
                    Version: 1,
                    Key: "215854",
                    Type: "City",
                    Rank: 31,
                    LocalizedName: "Tel Aviv",
                    Country: {
                        ID: "IL",
                        LocalizedName: "Israel"
                    },
                    AdministrativeArea: {
                        ID: "TA",
                        LocalizedName: "Tel Aviv"
                    }
                })
            }
        }
    }

    async function getWeather() {
        await setDefaultCity()
        if (!selectedCity && !savedFavoriteCity) return
        const city = savedFavoriteCity || selectedCity
        try {
            if (savedFavoriteCity) {
                setCurrConditions(savedFavoriteCity.conditions)
            } else {
                const conditions = await citiesService.getCurrConditions(selectedCity.Key)
                setCurrConditions(conditions)
            }
            const forecast = await citiesService.get5DaysForecast(city.Key)
            setFiveDaysForecaset(forecast)
            showSuccessMsg(`Weather for ${city.LocalizedName} has been fetched`)
        } catch (error) {
            showErrorMsg(`Error fetching weather for ${city.LocalizedName}`)
        }
    }

    async function onSelectCity(ev, selectedOption) {
        if (!selectedOption) {
            setSearchBy('')
            return
        }
        const cityFromStorage = await citiesService.getCityByKey(selectedOption?.Key)
        const city = cityFromStorage || selectedOption
        setFavoriteCity(null)
        setSelectedCity(city)
        setSearchBy(city.LocalizedName)
    }

    function handleChange(ev) {
        if (!ev) return
        const value = ev.target.value
        if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setSearchBy(value)
        }
        else {
            if (value === 0) return
            showErrorMsg('Only english is allowed')
        }
    }

    return (
        <section className='weather-details-container'>
            <Autocomplete
                disablePortal
                onInputChange={handleChange}
                inputValue={searchBy}
                value={selectedCity}
                onChange={onSelectCity}
                isOptionEqualToValue={(option, value) => option?.Key === value?.Key}
                getOptionLabel={(option) => option.LocalizedName}
                id="combo-box-demo"
                options={cityOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" />}
            />

            <CityDetails
                fiveDaysForecaset={fiveDaysForecaset}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                currConditions={currConditions}
            />
        </section>
    )
}