import { store } from '../store'
import { SET_CURR_PAGE, SET_FAVORITE_CITY, SET_IS_CELSIUS} from '../reducers/weather.reducer'

export function toggleDegreeType() {
    const isCelsius = store.getState().weatherModule.isCelsius
    store.dispatch({ type: SET_IS_CELSIUS, isCelsius: !isCelsius })
    return !isCelsius
}

export function setFavoriteCity(favCity) {
    store.dispatch({ type: SET_FAVORITE_CITY, favoriteCity: favCity })
}

export function setCurrPage(page){
    store.dispatch({ type: SET_CURR_PAGE, currPage: page })

}