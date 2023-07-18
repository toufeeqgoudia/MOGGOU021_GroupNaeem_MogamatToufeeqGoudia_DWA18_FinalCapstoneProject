import { useState, useEffect } from 'react';
import { fetchShows } from '../../Services/api';
import { genreMapping } from '../../Utils/genreMapping';
import SeasonList from '../SeasonList/SeasonList';

export default function ShowList() {
  const [shows, setShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchShows()
      .then((showsData) => {
        setShows(showsData);
      })
      .catch((error) => {
        console.log('Error fetching shows: ', error);
      });
  }, []);

  function handleShow(showId) {
    setSelectedShowId(showId);
    setDialogOpen(true);
  }

  function handleDialog() {
    setSelectedShowId(null);
    setDialogOpen(false);
  }

  if (!shows) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-16 w-full flex flex-wrap justify-between">
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
              <h3 className="text-sm px-1.5 py-1 font-bold">{show.title}</h3>
              <p className="text-xs px-1.5 pb-1">
                {show.seasons} Season{show.seasons <= 1 ? '' : 's'}
              </p>
              <p className="text-xs px-1.5 pb-1">
                {show.genres.map((genreId) => genreMapping[genreId]).join(', ')}
              </p>
              <p className="text-xs px-1.5 pb-1">
                Last Updated:{' '}
                {new Date(show.updated).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
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
  );
}
