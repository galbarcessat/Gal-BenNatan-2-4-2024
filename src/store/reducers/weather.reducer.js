export const SET_IS_CELSIUS = 'SET_IS_CELSIUS'
export const SET_IS_DARKMODE = 'SET_IS_DARKMODE'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FAVORITE_CITY = 'SET_FAVORITE_CITY'

const initialState = {
    isCelsius: true,
    isDarkMode: false,
    favoriteCity : null,
    isLoading: false
}

export function weatherReducer(state = initialState, action) {

    switch (action.type) {
        case SET_IS_CELSIUS:
            return { ...state, isCelsius: action.isCelsius }
        case SET_IS_DARKMODE:
            return { ...state, isDarkMode: action.isDarkMode }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case SET_FAVORITE_CITY:
            return { ...state, favoriteCity: action.favoriteCity }

        default:
            return { ...state }

    }
}
