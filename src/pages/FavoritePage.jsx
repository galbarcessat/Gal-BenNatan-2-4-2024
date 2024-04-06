import { useEffect, useState } from "react"
import { citiesService } from "../services/cities.service.local"
import { FavoriteList } from "../cmps/FavoriteList"

export function FavoritePage() {
    const [favoriteCities, setFavoriteCities] = useState(null)

    useEffect(() => {
        getFavCities()
    }, [])

    async function getFavCities() {
        const favCities = await citiesService.getFavoriteCities()
        const promises = favCities.map(async (favCity) => {
            const conditions = await citiesService.getCurrConditions(favCity.Key)
            return { ...favCity, conditions }
        })
        const updatedFavCities = await Promise.all(promises)
        setFavoriteCities(updatedFavCities)
    }

    return (
        <div className="favorite-page-container">
            <h1 className="favorite-title">Favorites</h1>
            <FavoriteList favoriteCities={favoriteCities} />
            {/* PUT THE GOOGLE MAPS HERE AND SHOW THE FAVORITES ON THE MAP */}
        </div>
    )
}
