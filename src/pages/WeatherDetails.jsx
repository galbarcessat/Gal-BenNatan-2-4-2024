import { useCallback, useEffect, useState } from 'react';
import { citiesService } from '../services/cities.service.local';
import { Autocomplete, TextField, debounce } from '@mui/material';
// import { ForecastList } from '../cmps/ForecastList';
// import { WeatherDetails } from '../cmps/WeatherDetails';

export function WeatherDetails() {
    const [searchBy, setSearchBy] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)
    const [cityOptions, setCityOptions] = useState(null)

    function handleChange(ev) {
        if (!ev) return
        const value = ev.target.value
        if (typeof value === 'number') {
            return
        }
        else if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setSearchBy(value)
            console.log('value:', value)
        }
    }


    return (
        <section className='weather-details-container'>
            {/* <Autocomplete
                disablePortal
                onInputChange={handleChange}
                // inputValue={searchBy}
                // value={selectedCity}
                // onChange={onSelectCity}
                // getOptionSelected={(option, value) => option.LocalizedName === value.LocalizedName}
                // getOptionLabel={(option) => option.LocalizedName}
                id="combo-box-demo"
                // options={cityOptions}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" />}
            /> */}
        </section>
    )
}