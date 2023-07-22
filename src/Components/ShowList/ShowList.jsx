import { useState, useEffect } from "react";
import { fetchShows } from "../../Services/api";
import { genreMapping } from "../../Utils/genreMapping";
import SeasonList from "../SeasonList/SeasonList";
import DiscoverList from "../DiscoverList/DiscoverList";
import useLoadingStore from "../../Model/useStore";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isLoading = useLoadingStore((state) => state.loading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    fetchShows()
      .then((showsData) => {
        setShows(showsData);
      })
      .catch((error) => {
        console.log("Error fetching shows: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);

  const handleShow = (showId) => {
    setSelectedShowId(showId);
    setDialogOpen(true);
  };

  const handleDialog = () => {
    setSelectedShowId(null);
    setDialogOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <DiscoverList shows={shows} />
          <h1>All Shows: </h1>
          <div className="mt-1 w-screen flex flex-wrap justify-between">
            {shows.length > 0 &&
              shows.map((show) => (
                <div
                  key={show.id}
                  className="w-44 h-80 m-20px mx-auto mb-2 bg-gray-300 rounded-lg text-left cursor-pointer object-fill border-none"
                  onClick={() => handleShow(show.id)}
                >
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-full h-42 top-0 rounded-lg"
                  />
                  <h3 className="text-sm px-1.5 py-1 font-bold">
                    {show.title}
                  </h3>
                  <p className="text-xs px-1.5 pb-1">
                    {show.seasons} Season{show.seasons <= 1 ? "" : "s"}
                  </p>
                  <p className="text-xs px-1.5 pb-1">
                    {show.genres
                      .map((genreId) => genreMapping[genreId])
                      .join(", ")}
                  </p>
                  <p className="text-xs px-1.5 pb-1">
                    Last Updated:{" "}
                    {new Date(show.updated).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
          </div>
      <SeasonList
        show={shows.find((show) => show.id === selectedShowId)}
        isOpen={dialogOpen}
        onClose={handleDialog}
        selectedShowId={selectedShowId}
      />
      </>
      )}
    </>
  );
};

export default ShowList;
