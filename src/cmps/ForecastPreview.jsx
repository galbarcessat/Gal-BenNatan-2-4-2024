import { utilService } from "../services/util.service"
import { citiesService } from "../services/cities.service.local"

export function ForecastPreview({ day, isCelsius }) {

    return (
        <div className="forecast-preview">
            {day && <>
                <span>{utilService.getDayOfWeek(day.Date)}</span>
                <img src={citiesService.getWeatherImage(day.Day.IconPhrase)} alt="" />
                <span>{utilService.getDegrees(isCelsius, day)}</span>
                <span className="daily-phrase">{day.Day.IconPhrase}</span>
                <a href={day.Link} target="_blank" rel="noopener noreferrer">GET FULL INFO</a>
            </>
            }
        </div>
    )
}

