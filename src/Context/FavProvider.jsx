import { useState, createContext, useEffect } from "react";
import { supabase } from "../Config/supabase";
import PropTypes from "prop-types";

const FavContext = createContext();

export default FavContext;

export const FavProvider = ({ children }) => {
  const [favouriteEpisode, setFavouriteEpisode] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const { data, error } = await supabase
          .from("favouriteEpisodes")
          .select();

        if (error) throw error;
        if (data) {
          setFavouriteEpisode(data);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchEpisodes()
  }, [])

  return (
    <FavContext.Provider value={{ favouriteEpisode }}>
      {children}
    </FavContext.Provider>
  );
};

FavProvider.propTypes = {
  children: PropTypes.any,
};
