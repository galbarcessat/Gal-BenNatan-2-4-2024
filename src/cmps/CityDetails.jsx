import { useSelector } from "react-redux";
import { ForecastList } from "./ForecastList"
import { CityDetailsHeader } from "./CityDetailsHeader";
import { Loader } from "./Loader";

export function CityDetails({ fiveDaysForecaset, selectedCity, setSelectedCity, currConditions }) {
    const isCelsius = useSelector(state => state.weatherModule.isCelsius)

    if (!currConditions) return <Loader />
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
