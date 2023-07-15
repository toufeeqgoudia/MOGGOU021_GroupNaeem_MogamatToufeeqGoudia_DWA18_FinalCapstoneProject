import { useEffect, useState, useRef } from 'react';
// import { Link, useParams } from 'react-router-dom';
import { genreMapping } from '../../Utils/genreMapping';
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import './SeasonList.css';

const descStyles = {
  WebkitLineClamp: 5,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
};

export default function Seasons({ show, isOpen, onClose, selectedShowId }) {
  const [showDetails, setShowDetails] = useState({ seasons: [] });
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const ref = useRef(null);
  const [seasonSelect, setSeasonSelect] = useState('');

  useEffect(() => {
    if (selectedShowId) {
      const fetchEpisodes = async () => {
        try {
          const response = await fetch(
            `https://podcast-api.netlify.app/id/${selectedShowId}`
          );
          if (!response.ok) {
            throw new Error('Something went wrong. Try again later.');
          }
          const data = await response.json();
          setShowDetails(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchEpisodes();
    }
  }, [selectedShowId]);

  useEffect(() => {
    if (ref.current) {
      setShowMoreButton(ref.current.scrollHeight !== ref.current.clientHeight);
    }
  }, []);

  function handleSeasonSelect(event) {
    setSeasonSelect(event.target.value);
  }

  function handleClose() {
    // FIX SETTING THE SELECT VALUE TO '' AFTER CLOSING DIALOG
    setSeasonSelect('');
  }

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="dsp-overlay">
          <Button onClick={handleClose} className="dsc-close">
            <CloseIcon />
          </Button>
          <img src={show.image} alt={show.title} className="dsp-img" />
          <h3 className="dsp-title">{show.title}</h3>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel>Select Season</InputLabel>
            <Select
              label="Select Season"
              value={seasonSelect}
              onChange={handleSeasonSelect}
            >
              {showDetails.seasons.length > 0 &&
                showDetails.seasons.map((season) => (
                  <MenuItem
                    key={season.season}
                    className="dsp-option"
                    value={season.season}
                  >
                    {season.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

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
  show: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedShowId: PropTypes.string,
};
