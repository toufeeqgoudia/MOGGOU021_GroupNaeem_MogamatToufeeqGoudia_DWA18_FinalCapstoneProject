// import { useEffect, useRef, useState } from 'react';
// import { genreMapping } from '../../Utils/genreMapping';
// import { Button, Dialog } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import PropTypes from 'prop-types';
// import './SeasonList.css';

// const descStyles = {
//   WebkitLineClamp: 5,
//   WebkitBoxOrient: 'vertical',
//   overflow: 'hidden',
//   display: '-webkit-box',
// };

// export default function SeasonList({ show, isOpen, onClose }) {
//   const [episodes, setEpisodes] = useState([]);
//   const [isDescOpen, setIsDescOpen] = useState(false);
//   const [showMoreButton, setShowMoreButton] = useState(false);
//   const ref = useRef(null); 
  
//   useEffect(() => {
//     const fetchEpisodes = async (showId) => {
//       try {
//         const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
//         if (!response.ok) {
//           throw new Error('Error fetching episodes');
//         }
//         const data = await response.json();
//         setEpisodes(data);
//         console.log(`data: `, data)
//       } catch (error) {
//         console.log('Error fetching episodes: ', error);
//       }
//     };

//     fetchEpisodes();
//   }, []);

//   useEffect(() => {
//     if (ref.current) {
//       setShowMoreButton(ref.current.scrollHeight !== ref.current.clientHeight);
//     }
//   }, []);

//   if (!show) {
//     return null;
//   }

//   return (
//     <>
//     <Dialog open={isOpen} onClose={onClose}>
//       <div className="dsp-overlay">
//         <Button onClick={onClose} className="dsc-close">
//           <CloseIcon />
//         </Button>
//         <img src={show.image} alt={show.title} className="dsp-img" />
//         <h3 className="dsp-title">{show.title} ID:{show.id}</h3>

//           <select key={show.id}>
//             <option value=''>{episodes.id}</option>
//           </select>

//         <p className="dsp-text">
//           {show.genres.map((genreId) => genreMapping[genreId]).join(', ')}
//         </p>
//         <p className="dsp-text">
//           Last Updated:{' '}
//           {new Date(show.updated).toLocaleDateString('en-GB', {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric',
//           })}
//         </p>
//         <p
//           style={isDescOpen ? null : descStyles}
//           ref={ref}
//           className="dsp-desc"
//         >
//           {show.description}
//         </p>
//         {showMoreButton && (
//           <Button variant="text" size='small' onClick={() => setIsDescOpen(!isDescOpen)}>
//             {isDescOpen ? 'read less...' : 'read more...'}
//           </Button>
//         )}
//       </div>
//     </Dialog>
//     </>
//   );
// }

// SeasonList.propTypes = {
//   show: PropTypes.object,
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };



//   // useEffect(() => {
//   //   const fetchEpisodes = async () => {
//   //     try {
//   //       const response = await fetch(`https://podcast-api.netlify.app/id/10716`);
//   //       if (!response.ok) {
//   //         throw new Error('Error fetching episodes');
//   //       }
//   //       const data = await response.json();
//   //       setEpisodes(data);
//   //       console.log(`data: `, data)
//   //     } catch (error) {
//   //       console.log('Error fetching episodes: ', error);
//   //     }
//   //   };

//   //   fetchEpisodes();
//   // }, []);