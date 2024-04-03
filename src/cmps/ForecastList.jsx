import { ForecastPreview } from "./ForecastPreview"

export function ForecastList({ forecast }) {
  return (
    <div className="forecast-list">
      {forecast?.DailyForecasts.map(day => <ForecastPreview key={day.Date} day={day} />)}
    </div>
  )
}