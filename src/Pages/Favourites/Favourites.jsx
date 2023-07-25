import { useFavouriteStore } from "../../Model/useStore"

const Favourites = () => {
    const favouriteData = useFavouriteStore((state) => state.favouriteData)

    return (
        <div className="mt-16">
            <h2>Favourite Episodes</h2>
            {favouriteData.length === 0 ? (
                <p>No favourite episodes yet.</p>
            ) : (
                <div>
                    {favouriteData.map((episode) => (
                        <div key={episode.title}>
                            <h3>{episode.title}</h3>
                            <img src={episode.image} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favourites