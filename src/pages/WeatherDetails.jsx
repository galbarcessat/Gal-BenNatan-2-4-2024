import { useEffect, useState } from 'react';
import { citiesService } from '../services/cities.service.local';
import { utilService } from '../services/util.service';
import { Autocomplete, TextField } from '@mui/material';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { CityDetails } from '../cmps/CityDetails';
import { useSelector } from 'react-redux';
import { setFavoriteCity } from '../store/actions/weather.action';

// IMPORTANT
//try to fix all autocomplete bugs
//Tel aviv by default means it should automaticly search for tel aviv and get its updated data
//Add debounce to handleChange
//add toasts for success or error
//Dark/Light mode.

// EXTRAS
//Time greeting - good morning...
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
    const savedFavoriteCity = useSelector(state => state.weatherModule.favoriteCity)


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
        getWeather()
    }, [selectedCity])

    useEffect(() => {
        if (savedFavoriteCity) {
            setSelectedCity(savedFavoriteCity)
        }
    }, [savedFavoriteCity])

    async function getCityOptions() {
        try {
            if (searchBy) {
                const cities = await citiesService.getAutoComplete(searchBy)
                console.log('cities:', cities)
                setCityOptions(cities)
            }
        } catch (error) {
            console.log('error:', error)
            showErrorMsg(`Error fetching data for city options`)
        }
    }

    async function getWeather() {
        // later check if navigator as well
        console.log('savedFavoriteCity:', savedFavoriteCity)
        console.log('selectedCity:', selectedCity)

        if (!selectedCity && !savedFavoriteCity) return
        // CHECK IN REDUX STORE IF THERES A SELECTED FAVORITE 
        const city = savedFavoriteCity ? savedFavoriteCity : selectedCity
        try {
            // IF SELECTED FAVORTIE GET CONDITIONS FROM THERE ELSE MAKE THE API CALL
            if (savedFavoriteCity) {
                console.log('conditions from saved favorite:', savedFavoriteCity.conditions)
                setCurrConditions(savedFavoriteCity.conditions)
            } else {
                console.log('conditions from selected:')
                const conditions = await citiesService.getCurrConditions(selectedCity.Key)
                setCurrConditions(conditions)
            }

            const forecast = await citiesService.get5DaysForecast(city.Key)
            setFiveDaysForecaset(forecast)
            showSuccessMsg(`Weather for ${city.LocalizedName} has been fetched`)
        } catch (error) {
            console.log('error:', error)
            showErrorMsg(`Error fetching weather for ${city.LocalizedName}`)
        }


    }

    async function onSelectCity(ev, selectedOption) {
        if (!selectedOption) return
        const cityFromStorage = await citiesService.getCityByKey(selectedOption?.Key)
        const city = cityFromStorage ? cityFromStorage : selectedOption
        setFavoriteCity(null)
        setSelectedCity(city)
        setSearchBy(city.LocalizedName)
    }

    //ADD DEBOUNCE AND ADD AN ERROR IF USER WRITES NOT IN ENGLISH
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