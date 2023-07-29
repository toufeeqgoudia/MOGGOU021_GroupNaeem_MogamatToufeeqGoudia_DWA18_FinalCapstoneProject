import { useState, useRef, useEffect } from "react";
import { supabase } from "../../Config/supabase";
import { useAuth } from "../../Hooks/useAuth";
// import useLoadingStore from "../../Model/useStore";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { styled, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PropTypes from "prop-types";
import EpisodePopup from "./EpisodePopup";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.8,
  fontWeight: 500,
  letterSpacing: 0.2,
  paddingLeft: "1rem",
});

const EpisodeListComp = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef(null);
  const { user } = useAuth();
  const [favouriteEpisode, setFavouriteEpisode] = useState([]);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const { data, error } = await supabase.from("favouriteEpisodes").select();

      if (error) throw error;
      if (data) {
        setFavouriteEpisode(data);
      }
    } catch (error) {
      console.log("fetching from EpisodeListComp: ", error.message);
    }
  };

  /**
   * Figure out if favouriteEpisode can be used as context to use all over website
   */

  const isEpisodeInFavourite = favouriteEpisode.some(
    (favEpisode) => favEpisode.title === episode.title
  );

  const addToFavourites = async () => {
    if (!isEpisodeInFavourite) {
      try {
        const { error } = await supabase.from("favouriteEpisodes").insert({
          id: user.id,
          title: episode.title,
          description: episode.description,
          episode: episode.episode,
          file: episode.file,
          created_at: episode.created_at,
        });

        if (error) {
          console.log("Could not save episode to favourites", error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromFavourites = async () => {
    if (isEpisodeInFavourite) {
      try {
        const { error } = await supabase
          .from("favouriteEpisodes")
          .delete()
          .eq("title", episode.title);

        if (error) throw error;
      } catch (error) {
        console.log("deleting from EpisodeListComp: ", error.message);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowPopup(true);
    if (isPlaying === true) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

  const handleSliderChange = (newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsPlaying(false);
    audioRef.current.pause();
  };

  return (
    <div
      key={episode.title}
      className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
    >
      <h4 className="text-sm px-1.5 py-1 font-bold">{episode.title}</h4>
      <p className="text-xs px-1.5 pb-1">{episode.description}</p>

      {!isEpisodeInFavourite ? (
        <Button variant="text" size="small" onClick={addToFavourites}>
          <StarBorderIcon />
          Add to favourites
        </Button>
      ) : (
        <Button
          variant="text"
          size="small"
          onClick={removeFromFavourites}
        >
          <StarIcon />
          Remove from favourites
        </Button>
      )}

      <div className="flex flex-row items-center justify-center">
        <Button onClick={togglePlayPause}>
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
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />

        <TinyText>
          <span>{formatTime(duration - currentTime)}</span>
        </TinyText>
      </div>
      {isPlaying && (
        <audio
          src={episode.file}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}

      {showPopup && (
        <EpisodePopup
          onClose={handlePopupClose}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          togglePlayPause={togglePlayPause}
          handleSliderChange={handleSliderChange}
          formatTime={formatTime}
          episode={episode}
          audioRef={audioRef}
          handleTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          handleLoadedMetadata={handleLoadedMetadata}
        />
      )}
    </div>
  );
};

EpisodeListComp.propTypes = {
  episode: PropTypes.object,
};

export default EpisodeListComp;

/**
 * BUGS TO FIX:
 * to play again at exact point after pausing
 */
