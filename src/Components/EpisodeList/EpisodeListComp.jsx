import { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { styled, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PropTypes from 'prop-types';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.8,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function EpisodeListComp({ episode }) {
  const [addFavourites, setAddFavourites] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  function addToFavourites() {
    setAddFavourites(!addFavourites);
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

  const handleSliderChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      key={episode.title}
      className="w-88 min-h-48 bg-gray-300 m-20px mx-auto mb-2 rounded-lg"
    >
      <h4 className="text-sm px-1.5 py-1 font-bold">{episode.title}</h4>
      <p className="text-xs px-1.5 pb-1">{episode.description}</p>
      <Button>
        {addFavourites ? (
          <StarIcon onClick={addToFavourites} />
        ) : (
          <StarBorderIcon onClick={addToFavourites} />
        )}
      </Button>
      <div className="flex flex-row content-center items-center">
        <Button onClick={togglePlayPause}>
          {isPlaying ? (
            <PauseCircleIcon className="nav-icon" onClick={togglePlayPause} />
          ) : (
            <PlayCircleIcon className="nav-icon" onClick={togglePlayPause} />
          )}
        </Button>

        <div className="w-full flex flex-row content-center items-center justify-evenly">
          <Slider
            aria-label="time-indicator"
            size="small"
            value={currentTime}
            max={duration}
            onChange={handleSliderChange}
            sx={{
              width: 200,
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

          <TinyText>{formatTime(duration - currentTime)}</TinyText>
        </div>
      </div>
      {isPlaying && (
        <audio
          src={episode.file}
          ref={audioRef}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </div>
  );
}

EpisodeListComp.propTypes = {
  episode: PropTypes.object,
};

/**
 * BUGS TO FIX:
 * play one of the episode.files at a time instead of loading all at once
 * to play again at exact point after pausing
 *
 * add to favourites / remove from favourites
 */
