import { useContext } from "react";
import FavContext from "../Context/FavProvider";

export const useFav = () => {
    return useContext(FavContext)
}