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

export const fetchEpisodes = async () => {
    try {
        const showResponse = await fetch('https://podcast-api.netlify.app/shows')
        const showData = await showResponse.json()
        const shows = showData[0]

        const url = `https://podcast-api.netlify.app/id/${shows.id}`
        const epsiodeResponse = await fetch(url)
        const episodeData = await epsiodeResponse.json()
        if (!episodeData.ok) {
            throw new Error('Error fetching episodes')
        }

    } catch (error) {
        console.log('Error fetching episodes: ', error)
        throw error
    }
}







// export const fetchEpisodes = async (showId) => {
//     try {
//         const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`)
//         if (!response.ok) {
//             throw new Error('Error fetching episodes')
//         }
//         return await response.json()
//     } catch (error) {
//         console.log('Error fetching episodes: ', error)
//         throw error
//     }
// }