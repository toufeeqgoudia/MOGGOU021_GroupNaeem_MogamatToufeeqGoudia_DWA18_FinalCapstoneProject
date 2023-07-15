import { useState, useEffect } from 'react';
import { fetchShows } from './CreateApi';
import { genreMapping } from '../Utils/genreMapping';
import Seasons from './Seasons';
import './Shows.css';

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
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="show-container">
        {shows.length > 0 &&
          shows.map((show) => (
            <div
              key={show.id}
              className="show-det"
              onClick={() => handleShow(show.id)}
            >
              <img src={show.image} alt={show.title} className="show-img" />
              <h3 className="show-title">{show.title}</h3>
              <p className="show-text">
                {show.seasons} Season{show.seasons <= 1 ? '' : 's'}
              </p>
              <p className="show-text">
                {show.genres.map((genreId) => genreMapping[genreId]).join(', ')}
              </p>
              <p className="show-text">
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
      <Seasons
        show={shows.find((show) => show.id === selectedShowId)}
        isOpen={dialogOpen}
        onClose={handleDialog}
        selectedShowId={selectedShowId}
      />
    </>
  );
}