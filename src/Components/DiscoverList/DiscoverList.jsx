import { useEffect, useState } from "react";
import { genreMapping } from "../../Utils/genreMapping";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const DiscoverList = ({ shows }) => {
  const [randomShows, setRandomShows] = useState([]);

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
    slidesToScroll: 1,
  };

  return (
    <div className="mt-20">
      <Slider {...settings}>
        {randomShows.map((show) => (
          <div
            key={show.id}
            className="w-44 h-80 m-20px mx-auto mb-2 bg-gray-300 rounded-lg text-left cursor-pointer object-fill border-none"
            onClick={() => handleShow(show.id)}
          >
            <img
              src={show.image}
              alt={show.title}
              className="w-full h-42 top-0 rounded-lg"
            />
            <h3 className="text-sm px-1.5 py-1 font-bold">{show.title}</h3>
            <p className="text-xs px-1.5 pb-1">
              {show.seasons} Season{show.seasons <= 1 ? "" : "s"}
            </p>
            <p className="text-xs px-1.5 pb-1">
              {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}
            </p>
            <p className="text-xs px-1.5 pb-1">
              Last Updated:{" "}
              {new Date(show.updated).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

DiscoverList.propTypes = {
  shows: PropTypes.array,
};

export default DiscoverList;
