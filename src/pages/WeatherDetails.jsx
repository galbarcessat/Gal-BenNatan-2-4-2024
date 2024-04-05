import { useEffect, useState } from 'react';
import { citiesService } from '../services/cities.service.local';
import { utilService } from '../services/util.service';
import { Autocomplete, TextField } from '@mui/material';
import { showErrorMsg } from '../services/event-bus.service';
import { CityDetails } from '../cmps/CityDetails';

// IMPORTANT
//try to fix all autocomplete bugs
//caching system isnt good it saves conditions and forecast which isnt up to date - ITS ONLY FOR DEV NOT FOR PRODUCTION
//Caching system should only be for if its in favorites or not 
//Tel aviv by default means it should automaticly search for tel aviv and get its updated data
//Add debounce to handleChange
//add toasts for success or error
//Dark/Light mode and C/F should be in the header and work with Redux.

// EXTRAS
//Check the time if its day or night and by it take the data for CityDetails and for ForecastPreview
//Add a p above the autocomplete or a tooltip to it with MUI that says you only have to type in english and not numbers

export function WeatherDetails() {
    const [searchBy, setSearchBy] = useState('')
    // const [selectedCity, setSelectedCity] = useState(null)
    //this default to Tel Aviv isnt good it should search for tel aviv to get 
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
    }
    )
    const [cityOptions, setCityOptions] = useState([])
    const [currConditions, setCurrConditions] = useState(null)
    const [fiveDaysForecaset, setFiveDaysForecaset] = useState(null)

    // useEffect(() => {
    //     //אם לא לחצתי על אחד מהאהובים אז אין איידי של אחד אהוב ולשים ישר תל אביב
    //     if (!cityId) {
    //         setSearchBy('Tel aviv')
    //     }
    // })

    useEffect(() => {
        getCityOptions()
    }, [searchBy])

    useEffect(() => {
        // getWeather()
        getConditions()
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
        // ONLY SAVE TO LOCAL STORAGE IF FAVORITE 
        // CHECK IF IS IN LOCAL STORAGE TO SHOW IF FAVORTIE OR NO 
        const cityFromStorage = await citiesService.getCityByName(selectedCity.LocalizedName)
        const city = cityFromStorage ? cityFromStorage : selectedCity
        try {
            const conditions = await citiesService.getCurrConditions(city.Key)
            setCurrConditions(conditions)

            const forecast = await citiesService.get5DaysForecast(city.Key)
            setFiveDaysForecaset(forecast)
            //SHOW SUCCESS MSG
        } catch (error) {
            console.log('error:', error)
            //SHOW ERROR MSG
        }


    }


    // async function getWeather() {
    //     if (!selectedCity) return
    //     const cityFromStorage = await citiesService.getCityByName(selectedCity.LocalizedName)
    //     if (cityFromStorage) {
    //         console.log('Getting city from local storage')
    //         setCurrConditions(cityFromStorage.conditions)
    //         setFiveDaysForecaset(cityFromStorage.forecast)
    //         return
    //     } else {
    //         try {
    //             const conditions = await citiesService.getCurrConditions(selectedCity.Key)
    //             setCurrConditions(conditions)

    //             const forecast = await citiesService.get5DaysForecast(selectedCity.Key)
    //             setFiveDaysForecaset(forecast)

    //             const cityToSave = { cityDetails: selectedCity, conditions, forecast }
    //             console.log('cityToSave:', cityToSave)
    //             citiesService.save(cityToSave)
    //         } catch (error) {
    //             console.log('error:', error)
    //             // showErrorMsg('Could not fetch data for conditions and forecast ')
    //         }

    //     }
    // }

    async function onSelectCity(ev, selectedOption) {
        let cityFromStorage = await citiesService.getCityByName(selectedOption?.LocalizedName)
        if (cityFromStorage) {
            setSelectedCity(cityFromStorage.cityDetails)
        } else {
            setSelectedCity(selectedOption)
        }
        setSearchBy(selectedOption?.LocalizedName)
    }

    function handleChange(ev) {
        if (!ev) return
        const value = ev.target.value
        if (typeof value === 'number') {
            return
        }
        else if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            console.log('English:', value)
            setSearchBy(value)
        }
        else {
            console.log('Hebrew?:', value)
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