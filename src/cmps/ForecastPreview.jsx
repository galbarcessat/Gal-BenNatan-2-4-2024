
import { utilService } from "../services/util.service"
import { citiesService } from "../services/cities.service.local"

export function ForecastPreview({ day }) {
    //get isCelsius from store

    function getDegrees() {
        const degInC = day?.Temperature.Maximum.Value
        if (isCelsius) {
            return degInC + '°C'
        } else {
            return celsiusToFahrenheit(degInC) + '°F'
        }
    }

    function celsiusToFahrenheit(degCelsius) {
        return Math.trunc((degCelsius * 9 / 5) + 32)
    }

    return (
        <div className="forecast-preview">
            <span>{utilService.getDayOfWeek(day?.Date)}</span>
            <img src={citiesService.getWeatherImage(day.Day.IconPhrase)} alt="" />
            {/* <span>{getDegrees()}</span> */}
            <span>{day && Math.trunc(day.Temperature.Minimum.Value) + '°C' + ' - ' + Math.trunc(day.Temperature.Maximum.Value) + '°C'}</span>
        </div>
    )
}

