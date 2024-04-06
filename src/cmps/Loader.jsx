
import LoadingGif from '../assets/imgs/LoadingGif.gif'

export function Loader() {
    return (
        <div className="loading-container">
            <img src={LoadingGif} alt="" />
        </div>
    )
}
