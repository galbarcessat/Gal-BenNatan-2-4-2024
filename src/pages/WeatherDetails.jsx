import { useEffect, useState } from 'react';
import { citiesService } from '../services/cities.service.local';
import { utilService } from '../services/util.service';
import { Autocomplete, TextField } from '@mui/material';
import { showErrorMsg } from '../services/event-bus.service';

//Add a p above the autocomplete or a tooltip to it with MUI that says you obly have to type in english and not numbers
//Add debounce to handleChange
//try to fix all autocomplete bugs
//Design the layout
//show data 
//get weather images
//add toasts for success or error

export function WeatherDetails() {
    const [searchBy, setSearchBy] = useState('')
    // const [selectedCity, setSelectedCity] = useState(null)
    const [selectedCity, setSelectedCity] = useState({
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
    const [cityOptions, setCityOptions] = useState([])
    const [currConditions, setCurrConditions] = useState(null)
    const [fiveDaysForecaset, setFiveDaysForecaset] = useState(null)

    useEffect(() => {
        getCityOptions()
    }, [searchBy])

    useEffect(() => {
        getWeather()
    }, [selectedCity])

    async function getCityOptions() {
        try {
            if (searchBy) {
                const cities = await citiesService.getAutoComplete(searchBy)
                console.log('cities:', cities)
                setCityOptions(cities)
            }
        } catch (error) {
            console.log('error:', error)
            // showErrorMsg('Could not fetch data for cities')
        }
    }

    async function getWeather() {
        if (!selectedCity) return
        const cityFromStorage = await citiesService.getCityByName(selectedCity.LocalizedName)
        if (cityFromStorage) {
            console.log('Getting city from local storage')
            setCurrConditions(cityFromStorage.conditions)
            setFiveDaysForecaset(cityFromStorage.forecast)
            return
        } else {
            try {
                const conditions = await citiesService.getCurrConditions(selectedCity.Key)
                setCurrConditions(conditions)

                const forecast = await citiesService.get5DaysForecast(selectedCity.Key)
                setFiveDaysForecaset(forecast)

                const cityToSave = { cityDetails: selectedCity, conditions, forecast }
                console.log('cityToSave:', cityToSave)
                citiesService.save(cityToSave)
            } catch (error) {
                console.log('error:', error)
                // showErrorMsg('Could not fetch data for conditions and forecast ')
            }

        }
    }

    async function onSelectCity(ev, selectedOption) {
        let cityFromStorage = await citiesService.getCityByName(selectedOption?.LocalizedName)
        if (cityFromStorage) {
            setSelectedCity(cityFromStorage.cityDetails)
        } else {
            setSelectedCity(selectedOption)
        }
        // setSearchBy(selectedOption?.LocalizedName)
    }

    function handleChange(ev) {
        if (!ev) return
        const value = ev.target.value
        if (typeof value === 'number') {
            return
        }
        else if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setSearchBy(value)
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
                getOptionSelected={(option, value) => option.LocalizedName === value.LocalizedName}
                getOptionLabel={(option) => option.LocalizedName}
                // isOptionEqualToValue={(option, value) => option.Key === value.Key}
                id="combo-box-demo"
                options={cityOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" />}
            />
        </section>
    )
}