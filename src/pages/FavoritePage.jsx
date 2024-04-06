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

    // when a favorite is being clicked navigate to WeatherDetails and show the updated details there
    // maybe send its correct conditions and its city info together - use redux to make an object of its city info and conditions
    // the store will have favoriteCity and it will be saved there when being click
    // then WeatherDetails checks if theres a favoriteCity if yes it makes a call for 5DaysForecast and shows the info 
    // and conditons from redux store

    return (
        <div className="favorite-page-container">
            <h1 className="favorite-title">Favorites</h1>
            <FavoriteList favoriteCities={favoriteCities} />
            {/* PUT THE GOOGLE MAPS HERE AND SHOW THE FAVORITES ON THE MAP */}
        </div>
    )
}
