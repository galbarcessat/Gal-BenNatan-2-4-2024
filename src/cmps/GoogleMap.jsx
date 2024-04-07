import { useEffect, useState } from 'react'
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import { Loader } from './Loader'
import { citiesService } from '../services/cities.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const VITE_GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID

export function GoogleMap({ favoriteCities, isCelsius }) {
    const [updatedFavCities, setUpdatedFavCities] = useState()

    useEffect(() => {
        getFavCitiesCords()
    }, [favoriteCities])

    async function getFavCitiesCords() {
        if (!favoriteCities) return
        try {
            const updatedCities = await Promise.all(favoriteCities.map(async (city) => {
                const position = await citiesService.getLongLat(city.LocalizedName, city.Country.LocalizedName)
                return { ...city, position }
            }))
            setUpdatedFavCities(updatedCities)
            showSuccessMsg('Successfully fetched data for the map.')
        } catch (error) {
            showErrorMsg('Failed to fetch data for the map. Please try again later.')
        }
    }

    function getDegrees(city) {
        return isCelsius ? city.conditions[0].Temperature.Metric.Value + '°C' : city.conditions[0].Temperature.Imperial.Value + '°F'
    }

    if (!updatedFavCities) return <Loader />
        return (
            <div className='google-map-container'>
                <APIProvider apiKey={VITE_GOOGLE_MAPS_API_KEY}>
                    <Map
                        style={{ width: '65vw', height: '40vh' }}
                        defaultCenter={{ lat: 22.54992, lng: 0 }}
                        defaultZoom={3}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        mapId={VITE_GOOGLE_MAP_ID}

                    >
                        {updatedFavCities.length > 0 && updatedFavCities.map(city => {
                            return <AdvancedMarker position={city.position} key={city.Key}>
                                <div className='map-marker'>
                                    <h1>{city.LocalizedName}</h1>
                                    <img src={citiesService.getWeatherImage(city.conditions[0].WeatherText)} alt={city.conditions[0].WeatherText} />
                                    <span>{getDegrees(city)}</span>
                                </div>
                            </AdvancedMarker>
                        })}
                    </Map>
                </APIProvider>
            </div>
        )
}
