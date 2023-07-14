export const fetchShows = async () => {
  try {
    const response = await fetch('https://podcast-api.netlify.app/shows');
    if (!response.ok) {
      throw new Error('Error fetching shows');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching shows: ', error);
  }
};

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


// const URL = 'https://podcast-api.netlify.app/shows'

// export const fetchShows = () => {
//   const result = fetch(URL)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Something went wrong. Try again later.')
//       }
//       return response
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       const result = data.map((item) => ({
//         ...item,
//         id: item.id
//       }))
//       return result
//     })
//     .catch((error) => {
//       console.log(error)
//       return error
//     })

//     return result
// }

// export const fetchEpisodes = async (id) => {
//     try {
//         const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
//         if (!response.ok) {
//             throw new Error('Error fetching episodes')
//         }
//         return await response.json()
//     } catch (error) {
//         console.log('Error fetching episodes: ', error)
//         throw error
//     }
// }

// export const fetchShows = (showId) => {
//   const result = fetch(`https://podcast-api.netlify.app/id/${showId}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Something went wrong. Try again later.');
//       }
//       return response;
//     })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log(error);
//       return error;
//     });

//   return result;
// };
