import { useSelector } from "react-redux";
import { FavoritePreview } from "./FavoritePreview";
import { Loader } from "./Loader";

export function FavoriteList({ favoriteCities }) {
  const isCelsius = useSelector(state => state.weatherModule.isCelsius)

  if (!favoriteCities) return  <Loader />
  return (
    <div className="favorite-list">
      {favoriteCities?.map(favCity => <FavoritePreview key={favCity._id} favCity={favCity} isCelsius={isCelsius} />)}
    </div>
  )
}


