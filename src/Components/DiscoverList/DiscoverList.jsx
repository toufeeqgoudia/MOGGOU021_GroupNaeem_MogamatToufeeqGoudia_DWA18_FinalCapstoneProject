import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PropTypes from "prop-types";
import SeasonList from "../SeasonList/SeasonList";

const DiscoverList = ({ shows }) => {
  const [randomShows, setRandomShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const getRandomPodcasts = (count) => {
      const shuffledPodcasts = shows.sort(() => Math.random() - 0.5);
      const randomPodcasts = shuffledPodcasts.slice(0, count);
      return randomPodcasts;
    };

    const numberOfPodcasts = 10;
    const randomPodcasts = getRandomPodcasts(numberOfPodcasts);
    setRandomShows(randomPodcasts);
  }, [shows]);

  const settings = {
    draggable: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    prevArrow: <NavigateBeforeIcon sx={{color: '#4c8bf5'}} />,
    nextArrow: <NavigateNextIcon sx={{color: '#4c8bf5'}} />,
  };

  const handleShow = (showId) => {
    setSelectedShowId(showId);
    setDialogOpen(true);
  };

  const handleDialog = () => {
    setSelectedShowId(null);
    setDialogOpen(false);
  };

  return (
    <>
      <div className="mt-16 max-w-screen flex flex-col justify-self-center content-center">
        <h2>Podcasts you may be interested in...</h2>
        <div className="flex justify-center items-center">
          <Slider {...settings} className="w-3/4 inline-flex items-center justify-evenly" ref={sliderRef}>
            {randomShows.map((show) => (
              <div
                key={show.id}
                className="rounded-lg text-left cursor-pointer object-fill border-none"
                onClick={() => handleShow(show.id)}
              >
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full top-0 rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <SeasonList
        show={randomShows.find((show) => show.id === selectedShowId)}
        isOpen={dialogOpen}
        onClose={handleDialog}
        selectedShowId={selectedShowId}
      />
    </>
  );
};

DiscoverList.propTypes = {
  shows: PropTypes.array,
};

export default DiscoverList;
