import { useState } from "react"
import { citiesService } from "../services/cities.service.local"
import { ForecastList } from "./ForecastList"
import FavoriteIcon from '@mui/icons-material/Favorite';

//FIX LAYOUT AND OVERALL DESIGN WITH SASS
export function CityDetails({ fiveDaysForecaset, selectedCity, setSelectedCity, currConditions }) {
    const [isFavorite, setIsFavorite] = useState(false)

    async function onToggleFavorite() {
        const savedCity = await citiesService.toggleIsFavorite(selectedCity?.LocalizedName)
        setSelectedCity(savedCity.cityDetails)
    }

    //put a loading gif
    if (!currConditions) return <div>Loading...</div>
    // const celsiusOrFahrenheit = isCelsius ? currConditions[0]?.Temperature.Metric.Value + '°C' : currConditions[0]?.Temperature.Imperial.Value + '°F'
    return (
        <div className="city-details-container">

            <div className="city-details-header">
                <div className="city-info-container">
                    {fiveDaysForecaset && <img src={citiesService.getWeatherImage(fiveDaysForecaset.DailyForecasts[0].Day.IconPhrase)} alt="" />}
                    <div>
                        <span>{selectedCity?.LocalizedName}</span>
                        {/* {currConditions && <span>{celsiusOrFahrenheit}</span>} */}
                        {currConditions && <span>{currConditions[0]?.Temperature.Metric.Value + '°C'}</span>}
                    </div>
                </div>
                <div className="toggle-favorite-container">
                    <div className='heart-container'>
                        <FavoriteIcon
                            onClick={() => onToggleFavorite()}
                            fontSize="large"
                            style={{ color: selectedCity?.isFavorite ? 'red' : 'white' }}
                            className={selectedCity?.isFavorite ? 'favorite' : ''}
                        />
                    </div>
                    <button
                        className='btn-add-to-fav'
                        onClick={() => onToggleFavorite()}>
                        Add to favorites
                    </button>
                </div>
            </div>

            {currConditions && <h1>{currConditions[0]?.WeatherText}</h1>}
            <ForecastList forecast={fiveDaysForecaset}  />
        </div>
    )
}
