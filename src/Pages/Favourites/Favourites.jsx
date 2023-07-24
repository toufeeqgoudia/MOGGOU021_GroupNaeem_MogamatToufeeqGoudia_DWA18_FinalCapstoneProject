import { useState } from "react"

const Favourites = () => {
    const [favouriteEpisodes, setFavouriteEpisodes] = useState([])

    // might remove addToFavourites because episodes are already in favourites
    const addTofavourites = (episode) => {
        setFavouriteEpisodes((prevFavourites) => [...prevFavourites, episode])
    }

    const removeFromFavourites = (episode) => {
        setFavouriteEpisodes((prevFavourites) => prevFavourites.filter((favEpisode) => favEpisode.title !== episode.title))
    }

    return (
        <div className="mt-16">
            <h2>Favourite Episodes</h2>
            {favouriteEpisodes.length === 0 ? (
                <p>No favourite episodes yet.</p>
            ): (
                <div>
                    {favouriteEpisodes.map((episode) => (
                        <div key={episode.title}>
                            <h3>{episode.title}</h3>
                            <button onClick={() => removeFromFavourites(episode)}>
                                Remove from favourites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favourites