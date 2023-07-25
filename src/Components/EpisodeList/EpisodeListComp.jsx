// import { useState, useRef } from "react";
// import Button from "@mui/material/Button";
// import Slider from "@mui/material/Slider";
// import { styled, Typography } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleIcon from "@mui/icons-material/PauseCircle";
// import PropTypes from "prop-types";
// import EpisodePopup from "./EpisodePopup";

// const TinyText = styled(Typography)({
//   fontSize: "0.75rem",
//   opacity: 0.8,
//   fontWeight: 500,
//   letterSpacing: 0.2,
//   paddingLeft: "1rem",
// });

// const EpisodeListComp = ({ episode }) => {
//   const [addFavourites, setAddFavourites] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const audioRef = useRef(null);

//   const addToFavourites = () => {
//     setAddFavourites(!addFavourites);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//     setShowPopup(true);
//   };

//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleLoadedMetadata = () => {
//     setDuration(audioRef.current?.duration);
//   };

//   const handleSliderChange = (event, newValue) => {
//     audioRef.current.currentTime = newValue;
//     setCurrentTime(newValue);
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     setIsPlaying(false);
//   };

//   return (
//     <div
//       key={episode.title}
//       className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
//     >
//       <h4 className="text-sm px-1.5 py-1 font-bold">{episode.title}</h4>
//       <p className="text-xs px-1.5 pb-1">{episode.description}</p>

//       {addFavourites ? (
//         <Button variant="text" size="small" onClick={addToFavourites}>
//           <StarIcon />
//           Remove from favourites
//         </Button>
//       ) : (
//         <Button variant="text" size="small" onClick={addToFavourites}>
//           <StarBorderIcon />
//           Add to favourites
//         </Button>
//       )}

//       <div className="flex flex-row items-center justify-center">
//         <Button onClick={togglePlayPause}>
//           {isPlaying ? (
//             <PauseCircleIcon className="nav-icon" onClick={togglePlayPause} />
//           ) : (
//             <PlayCircleIcon className="nav-icon" onClick={togglePlayPause} />
//           )}
//         </Button>

//         <Slider
//           aria-label="time-indicator"
//           size="small"
//           value={currentTime}
//           max={duration}
//           onChange={handleSliderChange}
//           sx={{
//             width: 200,
//             height: 4,
//             "& .MuiSlider-thumb": {
//               width: 8,
//               height: 8,
//               transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
//               "&:before": {
//                 boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
//               },
//               "&.Mui-active": {
//                 width: 20,
//                 height: 20,
//               },
//             },
//             "& .MuiSlider-rail": {
//               opacity: 0.28,
//             },
//           }}
//         />

//         <TinyText>{formatTime(duration - currentTime)}</TinyText>
//       </div>
//       {isPlaying && (
//         <audio
//           src={episode.file}
//           ref={audioRef}
//           autoPlay
//           onTimeUpdate={handleTimeUpdate}
//           onEnded={() => setIsPlaying(false)}
//           onLoadedMetadata={handleLoadedMetadata}
//         />
//       )}

//       {showPopup && (
//         <EpisodePopup
//           onClose={handlePopupClose}
//           isPlaying={isPlaying}
//           currentTime={currentTime}
//           duration={duration}
//           togglePlayPause={togglePlayPause}
//           handleSliderChange={handleSliderChange}
//           formatTime={formatTime}
//           episode={episode}
//           audioRef={audioRef}
//           handleTimeUpdate={handleTimeUpdate}
//           onEnded={() => setIsPlaying(false)}
//           handleLoadedMetadata={handleLoadedMetadata}
//         />
//       )}
//     </div>
//   );
// };

// EpisodeListComp.propTypes = {
//   episode: PropTypes.object,
// };

// export default EpisodeListComp;

// /**
//  * BUGS TO FIX:
//  * to play again at exact point after pausing
//  *
//  * add to favourites / remove from favourites
//  */




import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { styled, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PropTypes from "prop-types";
import EpisodePopup from "./EpisodePopup";
import { useFavouriteStore } from "../../Model/useStore";

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

  const { favouriteData, setFavouriteData } = useFavouriteStore()

  const isEpisodeInFavourites = favouriteData.some((favEpisode) => favEpisode.title === episode.title)

  const addToFavourites = () => {
    if (isEpisodeInFavourites) {
      const updatedFavourites = favouriteData.filter((favEpisode) => favEpisode.title !== episode.title)
      setFavouriteData(updatedFavourites)
    } else {
      setFavouriteData([...favouriteData, episode])
    }
  };

  console.log('isEpisodeInFavourites: ', isEpisodeInFavourites)
  console.log('favouriteData: ', favouriteData)

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowPopup(true);
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
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsPlaying(false);
  };

  return (
    <div
      key={episode.title}
      className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
    >
      <h4 className="text-sm px-1.5 py-1 font-bold">{episode.title}</h4>
      <p className="text-xs px-1.5 pb-1">{episode.description}</p>

      {isEpisodeInFavourites ? (
        <Button variant="text" size="small" onClick={addToFavourites}>
          <StarIcon />
          Remove from favourites
        </Button>
      ) : (
        <Button variant="text" size="small" onClick={addToFavourites}>
          <StarBorderIcon />
          Add to favourites
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

        <TinyText>{formatTime(duration - currentTime)}</TinyText>
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
 *
 * add to favourites / remove from favourites
 */
