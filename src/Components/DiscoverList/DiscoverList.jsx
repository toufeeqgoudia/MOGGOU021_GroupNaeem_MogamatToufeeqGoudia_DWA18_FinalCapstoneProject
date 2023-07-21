import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import SeasonList from "../SeasonList/SeasonList";

const DiscoverList = ({ shows }) => {
  const [randomShows, setRandomShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getRandomPodcasts = (count) => {
      const shuffledPodcasts = shows.sort(() => Math.random() - 0.5);
      const randomPodcasts = shuffledPodcasts.slice(0, count);
      return randomPodcasts;
    };

    const numberOfPodcasts = 10;
    const randomPodcasts = getRandomPodcasts(numberOfPodcasts);
    setRandomShows(randomPodcasts);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
      <div className="mt-16">
        <h2>You may be interested in...</h2>
        <Slider {...settings}>
          {randomShows.map((show) => (
            <div
              key={show.id}
              className="w-44 m-20px mx-auto bg-gray-300 rounded-lg text-left cursor-pointer object-fill border-none"
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
