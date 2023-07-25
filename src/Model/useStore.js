import { create } from "zustand";

export const useLoadingStore = create((set) => ({
    loading: true,
    setLoading: (isLoading) => set({ loading: isLoading })
}))

const useFavouriteStore = create((set) => ({
    favouriteData: [],

    setFavouriteData: (data) => {
        set({ favouriteData: data });
        localStorage.setItem("favouriteData", JSON.stringify(data))
    }
}))

const initialFavouriteData = localStorage.getItem("favouriteData")
if (initialFavouriteData) {
    useFavouriteStore.setState({
        favouriteData: JSON.parse(initialFavouriteData),
    })
}

export default useFavouriteStore