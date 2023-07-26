import { useState, useEffect } from "react";
import { supabase } from "../../Config/supabase";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import SearchFavs from "../../Components/SearchShows/SearchFavs";

const Favourites = () => {
  const [favouriteEpisode, setFavouriteEpisode] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const { data, error } = await supabase
        .from("favouriteEpisodes")
        .select("*");

      if (error) {
        setFetchError("Failed to fetch favourite episodes");
      }
      if (data) {
        setFavouriteEpisode(data);
        setFetchError("");
      }

      console.log("data: ", data);
    };

    fetchEpisodes();
  }, []);

  const handleRemoveFromFavourites = () => {
    console.log("hello");
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="mt-14">
      <h2 className="text-lg px-2 py-1 font-bold">Favourite Episodes</h2>
      {fetchError && <p>{fetchError}</p>}
      {favouriteEpisode.length === 0 ? (
        <p className="text-sm px-2 py-1">No favourite episodes yet.</p>
      ) : (
        <>
          <SearchFavs
            favouriteData={favouriteEpisode}
            onSearchResults={handleSearchResults}
          />

          {searchResults.length > 0 ? (
            <div className="mb-14">
              {searchResults.map((episode) => (
                <div
                  key={episode.user_id}
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
              {favouriteEpisode.map((episode) => (
                <div
                  key={episode.user_id}
                  className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
                >
                  <h4 className="text-sm px-1.5 py-1 font-bold">
                    {episode.title}
                  </h4>
                  <p className="text-xs px-1.5 pb-1">
                    Episode {episode.episode}
                  </p>
                  <p className="text-xs px-1.5 pb-1">{episode.description}</p>
                  <p className="text-xs px-1.5 pb-1">
                    Added on: {new Date(episode.created_at).toLocaleString()}
                  </p>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleRemoveFromFavourites(episode)}
                  >
                    <StarIcon />
                    Remove from favourites
                  </Button>

                  <audio src={episode.file} />
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
