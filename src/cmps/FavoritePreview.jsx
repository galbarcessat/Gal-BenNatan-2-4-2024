
import { useNavigate } from "react-router-dom"
import { citiesService } from "../services/cities.service.local"

export function FavoritePreview({ favCity, isCelsius }) {
    const navigate = useNavigate()

    function onSelectFavCity() {

        navigate('/')
    }

    const celsiusOrFahrenheit = isCelsius ? favCity.conditions[0].Temperature.Metric.Value + '°C' : favCity.conditions[0].Temperature.Imperial.Value + '°F'

    console.log('favCity:', favCity)
    return (
        <div className="favorite-preview" onClick={() => onSelectFavCity()}>
            {/* <div> */}
            <span>{favCity.LocalizedName}</span>
            <img src={citiesService.getWeatherImage(favCity.conditions[0].WeatherText)} alt="" />
            <span>{celsiusOrFahrenheit}</span>
            <span>{favCity.conditions[0].WeatherText}</span>
            {/* </div> */}
        </div>
    )
}
