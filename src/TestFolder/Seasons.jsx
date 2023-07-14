import { useEffect, useState, useRef } from 'react';
// import { fetchShows, fetchEpisodes } from './CreateApi';
import { genreMapping } from '../Utils/genreMapping';
import { Button, Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import './Seasons.css';

const descStyles = {
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
};

export default function Seasons({ showsData, show, isOpen, onClose }) {
  const [episodes, setEpisodes] = useState(null);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const ref = useRef(null);
  const [showId, setShowId] = useState(null)

  // IF showsData.map(data => data.id) === show 
  // THEN setShowId to that id

  console.log('showsData: ', showsData.map(data => data.id))

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error('Error fetching episodes');
        }
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.log('Error fetching episodes: ', error);
        throw error;
      }
    };
    fetchEpisodes();
  }, [showId]);

  console.log('episodes: ', episodes);

  useEffect(() => {
    if (ref.current) {
      setShowMoreButton(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="dsp-overlay">
          <Button onClick={onClose} className="dsc-close">
            <CloseIcon />
          </Button>
          <img src={show.image} alt={show.title} className="dsp-img" />
          <h3 className="dsp-title">
            {show.title} ID:{show.id}
          </h3>

          <select>
            {episodes.seasons.map((season) => (
              <option key={show.id}>Season {season.season}</option>
            ))}
          </select>

          <p className="dsp-text">
            {show.genres.map((genreId) => genreMapping[genreId]).join(', ')}
          </p>
          <p className="dsp-text">
            Last Updated:{' '}
            {new Date(show.updated).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p
            style={isDescOpen ? null : descStyles}
            ref={ref}
            className="dsp-desc"
          >
            {show.description}
          </p>
          {showMoreButton && (
            <Button
              variant="text"
              size="small"
              onClick={() => setIsDescOpen(!isDescOpen)}
            >
              {isDescOpen ? 'read less...' : 'read more...'}
            </Button>
          )}
        </div>
      </Dialog>
    </>
  );
}

Seasons.propTypes = {
  showsData: PropTypes.array,
  show: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// useEffect(() => {
//   const fetchEpisodes = async () => {
//     try {
//       const showResponse = await fetch(
//         'https://podcast-api.netlify.app/shows'
//       );
//       const showData = await showResponse.json();

//       const fetchedEpisodesData = [];
//       for (const shows of showData) {
//         const url = `https://podcast-api.netlify.app/id/${shows.id}`;
//         const episodeResponse = await fetch(url);
//         const episodeData = await episodeResponse.json();
//         fetchedEpisodesData.push(episodeData);
//       }

//       setEpisodes(fetchedEpisodesData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchEpisodes();
// }, []);
