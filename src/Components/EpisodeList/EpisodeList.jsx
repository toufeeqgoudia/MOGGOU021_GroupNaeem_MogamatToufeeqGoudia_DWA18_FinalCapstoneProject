import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EpisodeListComp from './EpisodeListComp';

export default function EpisodeList() {
  const location = useLocation();
  const showDetails = location.state;
  const [seasonSelected, setSeasonSelected] = useState('');
  const [selectedSeasonDetails, setSelectedSeasonDetails] = useState(null);

  function handleSeasonSelect(event) {
    const selectedSeason = event.target.value;
    setSeasonSelected(selectedSeason);

    const seasonDetails = showDetails.seasons.find(
      (season) => season.season === selectedSeason
    );
    setSelectedSeasonDetails(seasonDetails);
  }

  return (
    <div className="my-10">
      <div className='w-full h-1/3'>
        <img
          src={showDetails.image}
          alt={showDetails.title}
          className="w-full h-full"
        />
      </div>
      <h3 className="text-xl px-1.5 py-1 font-bold">{showDetails.title}</h3>

      <FormControl sx={{ m: 1, width: 150 }} size="small">
        <InputLabel sx={{ fontSize: 13 }}>Select Season</InputLabel>
        <Select
          sx={{ height: 25, fontSize: 13 }}
          size="small"
          label="Select Season"
          value={seasonSelected}
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

      {selectedSeasonDetails &&
        selectedSeasonDetails.episodes.map((episode) => (
          <EpisodeListComp episode={episode} key={episode.title} />
        ))}
    </div>
  );
}

/**
 * BUGS TO FIX:
 * size of image (All views)
 */
