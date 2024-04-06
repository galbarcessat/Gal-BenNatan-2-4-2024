import { store } from '../store'
import { SET_CURR_PAGE, SET_FAVORITE_CITY, SET_IS_CELSIUS, SET_IS_DARKMODE, SET_IS_LOADING } from '../reducers/weather.reducer'

export function toggleDegreeType() {
    const isCelsius = store.getState().weatherModule.isCelsius
    store.dispatch({ type: SET_IS_CELSIUS, isCelsius: !isCelsius })
}

export function toggleDarkLightMode() {
    const isDarkMode = store.getState().weatherModule.isDarkMode
    store.dispatch({ type: SET_IS_DARKMODE, isDarkMode: !isDarkMode })
}

export function setFavoriteCity(favCity) {
    store.dispatch({ type: SET_FAVORITE_CITY, favoriteCity: favCity })
}

export function setCurrPage(page){
    store.dispatch({ type: SET_CURR_PAGE, currPage: page })

}