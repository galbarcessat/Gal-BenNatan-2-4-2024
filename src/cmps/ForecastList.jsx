import { ForecastPreview } from "./ForecastPreview"

export function ForecastList({ forecast, isCelsius }) {
  return (
    <div className="forecast-list">
      {forecast?.DailyForecasts.map(day => <ForecastPreview key={day.Date} day={day} isCelsius={isCelsius} />)}
    </div>
  )
}