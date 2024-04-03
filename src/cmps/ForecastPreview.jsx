import { utilService } from "../services/util.service"
import { citiesService } from "../services/cities.service.local"

export function ForecastPreview({ day, isCelsius }) {

    function getDegrees() {
        const minDegInC = day.Temperature.Minimum.Value
        const maxDegInC = day.Temperature.Maximum.Value
        if (isCelsius) {
            return Math.trunc(minDegInC) + '°C' + ' - ' + Math.trunc(maxDegInC) + '°C'
        } else {
            return Math.trunc(celsiusToFahrenheit(minDegInC)) + '°F' + ' - ' + Math.trunc(celsiusToFahrenheit(maxDegInC)) + '°F'
        }
    }

    function celsiusToFahrenheit(degCelsius) {
        return Math.trunc((degCelsius * 9 / 5) + 32)
    }

    return (
        <div className="forecast-preview">
            {day && <>
                <span>{utilService.getDayOfWeek(day.Date)}</span>
                <img src={citiesService.getWeatherImage(day.Day.IconPhrase)} alt="" />
                <span>{getDegrees()}</span>
                <span className="daily-phrase">{day.Day.IconPhrase}</span>
                <a href={day.Link} target="_blank" rel="noopener noreferrer">GET FULL INFO</a>
            </>
            }
        </div>
    )
}

