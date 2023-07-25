import { create } from "zustand";

export const useLoadingStore = create((set) => ({
    loading: true,
    setLoading: (isLoading) => set({ loading: isLoading })
}))

export const useFavouriteStore = create((set) => ({
    favouriteData: [],
    setFavouriteData: (data) => set({ favouriteData: data })
}))