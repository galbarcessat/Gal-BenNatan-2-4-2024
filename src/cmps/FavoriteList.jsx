import { FavoritePreview } from "./FavoritePreview";
import { Loader } from "./Loader";

export function FavoriteList({ favoriteCities,isCelsius }) {

  if (!favoriteCities) return <Loader />
  if (favoriteCities.length === 0) return <div>0 cities saved to favorites.</div>
  return (
    <div className="favorite-list">
      {favoriteCities?.map(favCity => <FavoritePreview key={favCity._id} favCity={favCity} isCelsius={isCelsius} />)}
    </div>
  )
}


