export const fetchShows = async () => {
    try {
        const response = await fetch('https://podcast-api.netlify.app/shows')
        if (!response.ok) {
            throw new Error('Error fetching shows')
        }
        return await response.json()
    } catch (error) {
        console.log('Error fetching shows: ', error)
        throw error
    }
}

export const fetchEpisodes = async (itemID) => {
    try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${itemID}`)
        if (!response.ok) {
            throw new Error('Error fetching episodes')
        }
        return await response.json()
    } catch (error) {
        console.log('Error fetching episodes: ', error)
        throw error
    }
}