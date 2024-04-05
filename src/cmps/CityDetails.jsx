import { ForecastList } from "./ForecastList"
import { useSelector } from "react-redux";
import { CityDetailsHeader } from "./CityDetailsHeader";

export function CityDetails({ fiveDaysForecaset, selectedCity, setSelectedCity, currConditions }) {
    const isCelsius = useSelector(state => state.weatherModule.isCelsius)

    //put a loading gif
    if (!currConditions) return <div>Loading...</div>
    const celsiusOrFahrenheit = isCelsius ? currConditions[0]?.Temperature.Metric.Value + '°C' : currConditions[0]?.Temperature.Imperial.Value + '°F'
    return (
        <div className="city-details-container">
            <CityDetailsHeader
                fiveDaysForecaset={fiveDaysForecaset}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                celsiusOrFahrenheit={celsiusOrFahrenheit}
            />

            <div>
                <h1>{currConditions[0].WeatherText}</h1>
                <h2>{fiveDaysForecaset?.Headline.Text}</h2>
            </div>

            <ForecastList forecast={fiveDaysForecaset} isCelsius={isCelsius} />
        </div>
    )
}
