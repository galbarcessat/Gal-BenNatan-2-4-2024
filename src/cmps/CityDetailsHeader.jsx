import { citiesService } from '../services/cities.service.local'
import FavoriteIcon from '@mui/icons-material/Favorite';

export function CityDetailsHeader({ fiveDaysForecaset, selectedCity, setSelectedCity, celsiusOrFahrenheit }) {
    const [isFavorite, setIsFavorite] = useState(false)

    async function onToggleFavorite() {
        const savedCity = await citiesService.toggleIsFavorite(selectedCity)
        console.log('savedCity:', savedCity)
        setSelectedCity(savedCity)
    }

    return (
        <div className="city-details-header">
            <div className="city-info-container">
                {fiveDaysForecaset && <img src={citiesService.getWeatherImage(fiveDaysForecaset.DailyForecasts[0].Day.IconPhrase)} alt="" />}
                <div>
                    <span>{selectedCity?.LocalizedName}</span>
                    <span>{celsiusOrFahrenheit}</span>
                </div>
            </div>
            <div className="toggle-favorite-container">
                {/* <div className='heart-container'> */}
                <FavoriteIcon
                    onClick={() => onToggleFavorite()}
                    fontSize="large"
                    style={{ color: selectedCity?.isFavorite ? 'red' : 'white' }}
                    className={'heart-icon ' + selectedCity?.isFavorite ? 'favorite' : ''}
                />
                {/* </div> */}
                <button
                    className='btn-add-to-fav'
                    onClick={() => onToggleFavorite()}>
                    Add to favorites
                </button>
            </div>
        </div>
    )
}
