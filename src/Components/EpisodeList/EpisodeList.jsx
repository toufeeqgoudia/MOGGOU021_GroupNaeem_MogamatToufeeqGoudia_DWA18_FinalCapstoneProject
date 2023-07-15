// import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types';

// export default function EpisodeList({ endpoint }) {
//     const [episodes, setEpisodes] = useState([])

//     useEffect(() => {
//         const fetchEpisodes = async () => {
//             try {
//                 const response = await fetch(endpoint)
//                 if (!response.ok) {
//                     throw new Error('Error fetching episodes')
//                 }
//                 const data = await response.json()
//                 setEpisodes(data)
//             } catch (error) {
//                 console.log('Error fetching episodes: ', error)
//             }
//         }

//         fetchEpisodes()
//     }, [endpoint])
    
//     return (
//         <div>
//             <h2>Episodes</h2>
//             {episodes.map((episode) => (
//                 <div key={episode.id}>
//                     <h3>{episode.title}</h3>
//                 </div>
//             ))}
//         </div>
//     )
// }

// EpisodeList.propTypes = {
//     endpoint: PropTypes.object,
// }