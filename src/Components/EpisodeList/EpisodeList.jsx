import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, styled, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import './EpisodeList.css';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function EpisodeList() {
  const { showId } = useParams
  const [episodes, setEpisodes] = useState({episodes: []})

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error('Something went wrong. Try again later.');
        }
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEpisodes()
  }, [showId])

  console.log('episodes: ', episodes)

  return (
    <div className="container">
      <img src='' alt='' className="epi-image" />
      <h3>Show Title</h3>
      <select>
        <option>Select Season</option>
        <option>Season 1</option>
      </select>

      <div className="epi-container">
        <h4 className="epi-title">Episode 1: There were no red flags</h4>
        <p className="epi-desc">
          Episode description: Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Expedita perferendis cupiditate accusantium numquam,
          aliquam temporibus. Expedita id, illum delectus itaque nostrum,
          voluptate nam, natus molestiae doloribus minus esse ipsum.
          Voluptatibus!
        </p>
        <button>Add to Favourites</button>
        <div>
          <Button>
            <PlayCircleIcon className="nav-icon" />
          </Button>
          {/* <Slider
            aria-label="time-indicator"
            size="small"
            value=""
            min={0}
            step={1}
            max={2}
            //   onChange={(_, value) => setPosition(value)}
            sx={{
              // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  // boxShadow: `0px 0px 0px 8px ${
                  //   theme.palette.mode === 'dark'
                  //     ? 'rgb(255 255 255 / 16%)'
                  //     : 'rgb(0 0 0 / 16%)'
                  // }`,
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
          /> */}
          <TinyText>
            20:00{/* -{formatDuration(duration - position)} */}
          </TinyText>
        </div>
      </div>
    </div>
  );
}