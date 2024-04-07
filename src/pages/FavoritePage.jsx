import { useEffect, useState } from "react"
import { citiesService } from "../services/cities.service.local"
import { FavoriteList } from "../cmps/FavoriteList"
import { showErrorMsg } from "../services/event-bus.service"
import { GoogleMap } from "../cmps/GoogleMap"
import { useSelector } from "react-redux"

export function FavoritePage() {
    const [favoriteCities, setFavoriteCities] = useState(null)
    const isCelsius = useSelector(state => state.weatherModule.isCelsius)

    useEffect(() => {
        getFavCities()
    }, [])

    async function getFavCities() {
        const favCities = await citiesService.getFavoriteCities()
        try {
            const promises = favCities.map(async (favCity) => {
                const conditions = await citiesService.getCurrConditions(favCity.Key)
                return { ...favCity, conditions }
            })
            const updatedFavCities = await Promise.all(promises)
            setFavoriteCities(updatedFavCities)
        } catch (error) {
            showErrorMsg('Error fetching conditions for favorite cities')
        }
    }
    return (
        <>
            <div className="favorite-page-container">
                <h1 className="favorite-title">Favorites</h1>
                <FavoriteList favoriteCities={favoriteCities} isCelsius={isCelsius} />
                <GoogleMap favoriteCities={favoriteCities} isCelsius={isCelsius} />
            </div>
        </>
    )
}
