import { create } from 'zustand';

const useRecentStore = create((set) => ({
  recentEpisodes: [],
  setRecentEpisodes: (data) => {
    set({ recentEpisodes: data });
    localStorage.setItem('recentEpisode', JSON.stringify(data));
  },
  addToRecentEpisodes: (episode) => {
    set((state) => {
      const episodeExists = state.recentEpisodes.some(
        (item) => item.episode.title === episode.title
      );

      if (!episodeExists) {
        const updatedRecentEpisodes = [
          ...state.recentEpisodes,
          { episode, timestamp: new Date().toISOString() },
        ];
        return { recentEpisodes: updatedRecentEpisodes };
      }

      return state;
    });
  },
  clearRecentEpisodes: () => {
    set({ recentEpisodes: [] });
    localStorage.removeItem('recentEpisode');
  },
}));

export default useRecentStore