export const SET_IS_CELSIUS = 'SET_IS_CELSIUS'
export const SET_IS_DARKMODE = 'SET_IS_DARKMODE'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FAVORITE_CITY = 'SET_FAVORITE_CITY'
export const SET_CURR_PAGE = 'SET_CURR_PAGE'

const initialState = {
    isCelsius: true,
    isDarkMode: false,
    favoriteCity: null,
    currPage: 'home'

}

export function weatherReducer(state = initialState, action) {

    switch (action.type) {
        case SET_IS_CELSIUS:
            return { ...state, isCelsius: action.isCelsius }
        case SET_IS_DARKMODE:
            return { ...state, isDarkMode: action.isDarkMode }
        case SET_FAVORITE_CITY:
            return { ...state, favoriteCity: action.favoriteCity }
        case SET_CURR_PAGE:
            return { ...state, currPage: action.currPage }

        default:
            return { ...state }

    }
}
