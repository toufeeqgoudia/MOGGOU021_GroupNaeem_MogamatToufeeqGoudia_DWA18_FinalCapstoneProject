import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Slider, styled, Typography, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import './EpisodeList.css';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function EpisodeList() {
  const location = useLocation();
  const showDetails = location.state;
  const [seasonSelect, setSeasonSelect] = useState('');
  const [selectedSeasonDetails, setSelectedSeasonDetails] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef()
  const [currentPodcast, setCurrentPodcast] = useState()

  function handleSeasonSelect(event) {
    const selectedSeason = event.target.value;
    setSeasonSelect(selectedSeason);

    const seasonDetails = showDetails.seasons.find(
      (season) => season.season === selectedSeason
    );
    setSelectedSeasonDetails(seasonDetails);
  }

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if(isPlaying) {
      audioElem.current.play()
    } else {
      audioElem.current.pause()
    }
  }, [isPlaying])

  function formatDuration() {
    const duration = audioElem.current.duration
    const currentTime = audioElem.current.currentTime

    setCurrentPodcast({ ...currentPodcast, "progress": currentTime / duration, "length": duration })
  }

  return (
    <div className="container">
      <img
        src={showDetails.image}
        alt={showDetails.title}
        className="epi-image"
      />
      <h3>{showDetails.title}</h3>

      <FormControl sx={{ m: 1, width: 150 }} size="small">
        <InputLabel sx={{ fontSize: 13 }}>Select Season</InputLabel>
        <Select
          sx={{ height: 25, fontSize: 13 }}
          size="small"
          label="Select Season"
          value={seasonSelect}
          onChange={handleSeasonSelect}
        >
          {showDetails.seasons.length > 0 &&
            showDetails.seasons.map((season) => (
              <MenuItem
                sx={{ fontSize: 13 }}
                key={season.season}
                value={season.season}
              >
                <span style={{ fontWeight: 'bold' }}>{season.title}</span> (
                {season.episodes.length} episode
                {season.episodes.length <= 1 ? '' : 's'})
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedSeasonDetails && (
        <div>
          {selectedSeasonDetails.episodes.map((episode) => (
            <div key={episode.title} className="epi-container">
              <h4 className="epi-title">{episode.title}</h4>
              <p className="epi-desc">{episode.description}</p>
              <button>Add to Favourites</button>
              <div>
                <Button onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseCircleIcon className="nav-icon" />
                  ) : (
                    <PlayCircleIcon className="nav-icon" />
                  )}
                </Button>
                <Slider
                  aria-label="time-indicator"
                  size="small"
                  value={setCurrentPodcast}
                  min={0}
                  step={1}
                  max={setCurrentPodcast}
                  onChange={setCurrentPodcast}
                  sx={{
                    width: 230,
                    height: 4,
                    '& .MuiSlider-thumb': {
                      width: 8,
                      height: 8,
                      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                      '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                      },
                      '&.Mui-active': {
                        width: 20,
                        height: 20,
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.28,
                    },
                  }}
                />
                <TinyText>{formatDuration}</TinyText>
              </div>
              {isPlaying && <audio src={episode.file} ref={audioElem} autoPlay />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
