import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PropTypes from 'prop-types';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.8,
  fontWeight: 500,
  letterSpacing: 0.2,
  paddingLeft: '1rem',
});

const EpisodePopup = ({
  onClose,
  isPlaying,
  currentTime,
  duration,
  togglePlayPause,
  handleSliderChange,
  formatTime,
  episode,
  audioRef,
  handleTimeUpdate,
  onEnded,
  handleLoadedMetadata,
}) => {
  return (
    <div className='fixed bottom-10 left-0 right-0 max-w-screen h-18 bg-zinc-700 shadow-md flex flex-col z-10'>
        <div className='flex flex-row items-center justify-between'>
            <h4 className="text-xs px-1.5 pb-1 font-bold">{episode.title}</h4>
            <Button onClick={onClose} className="z-10">
                <CloseIcon />
            </Button>
        </div>
      
      <div className="flex flex-row items-center justify-center">
        <Button variant='text' onClick={togglePlayPause}>
          {isPlaying ? (
            <PauseCircleIcon className="nav-icon" onClick={togglePlayPause} />
          ) : (
            <PlayCircleIcon className="nav-icon" onClick={togglePlayPause} />
          )}
        </Button>
      
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

          <TinyText><span>{formatTime(duration - currentTime)}</span></TinyText>

        {isPlaying && (
          <audio
            src={episode.file}
            ref={audioRef}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onEnded={onEnded}
            onLoadedMetadata={handleLoadedMetadata}
          />
        )}
      </div>
    </div>
  );
}

EpisodePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  episode: PropTypes.object.isRequired,
  audioRef: PropTypes.object.isRequired,
  handleTimeUpdate: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
  handleLoadedMetadata: PropTypes.func.isRequired,
};

export default EpisodePopup