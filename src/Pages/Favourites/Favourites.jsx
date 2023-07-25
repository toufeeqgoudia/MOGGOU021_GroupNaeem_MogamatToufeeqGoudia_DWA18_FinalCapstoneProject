import { useState } from "react";
import useFavouriteStore from "../../Model/useStore";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import SearchFavs from "../../Components/SearchShows/SearchFavs";

const Favourites = () => {
  const favouriteData = useFavouriteStore((state) => state.favouriteData);
  const setFavouriteData = useFavouriteStore((state) => state.setFavouriteData);
  const [searchResults, setSearchResults] = useState([]);

  const handleRemoveFromFavourites = (episode) => {
    const updatedFavourites = favouriteData.filter(
      (favEpisode) => favEpisode.timestamp !== episode.timestamp
    );
    setFavouriteData(updatedFavourites);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="mt-14">
      <h2 className="text-lg px-2 py-1 font-bold">Favourite Episodes</h2>
      {favouriteData.length === 0 ? (
        <p className="text-sm px-2 py-1">No favourite episodes yet.</p>
      ) : (
        <>
          <SearchFavs
            favouriteData={favouriteData}
            onSearchResults={handleSearchResults}
          />

          {searchResults.length > 0 ? (
            <div className="mb-14">
              {searchResults.map((episode) => (
                <div
                  key={episode.title}
                  className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
                >
                  <h4 className="text-sm px-1.5 py-1 font-bold">
                    {episode.title}
                  </h4>
                  <p className="text-xs px-1.5 pb-1">{episode.description}</p>
                  <p className="text-xs px-1.5 pb-1">
                    Added on: {new Date(episode.timestamp).toLocaleString()}
                  </p>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleRemoveFromFavourites(episode)}
                  >
                    <StarIcon />
                    Remove from favourites
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-14">
              {favouriteData.map((episode) => (
                <div
                  key={episode.title}
                  className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
                >
                  <h4 className="text-sm px-1.5 py-1 font-bold">
                    {episode.title}
                  </h4>
                  <p className="text-xs px-1.5 pb-1">{episode.description}</p>
                  <p className="text-xs px-1.5 pb-1">
                    Added on: {new Date(episode.timestamp).toLocaleString()}
                  </p>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleRemoveFromFavourites(episode)}
                  >
                    <StarIcon />
                    Remove from favourites
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favourites;
