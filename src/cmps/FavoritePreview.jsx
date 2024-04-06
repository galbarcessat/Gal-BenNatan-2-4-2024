
import { useNavigate } from "react-router-dom"
import { citiesService } from "../services/cities.service.local"
import { setCurrPage, setFavoriteCity } from "../store/actions/weather.action"

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
