
import { useNavigate } from "react-router-dom"
import { citiesService } from "../services/cities.service.local"
import { setCurrPage, setFavoriteCity } from "../store/actions/weather.action"

// when a favorite is being clicked navigate to WeatherDetails and show the updated details there
// maybe send its correct conditions and its city info together - use redux to make an object of its city info and conditions
// the store will have favoriteCity and it will be saved there when being click
// then WeatherDetails checks if theres a favoriteCity if yes it makes a call for 5DaysForecast and shows the info 
// and conditons from redux store

export function FavoritePreview({ favCity, isCelsius }) {
    const navigate = useNavigate()

    function onSelectFavCity() {
        setFavoriteCity(favCity)
        setCurrPage('home')
        navigate('/')
    }

    const celsiusOrFahrenheit = isCelsius ? favCity.conditions[0].Temperature.Metric.Value + '°C' : favCity.conditions[0].Temperature.Imperial.Value + '°F'

    return (
        <div className="favorite-preview" onClick={() => onSelectFavCity()}>
            <span>{favCity.LocalizedName}</span>
            <span>{favCity.Country.LocalizedName}</span>
            <img src={citiesService.getWeatherImage(favCity.conditions[0].WeatherText)} alt="" />
            <span>{celsiusOrFahrenheit}</span>
            <span>{favCity.conditions[0].WeatherText}</span>
        </div>
    )
}
