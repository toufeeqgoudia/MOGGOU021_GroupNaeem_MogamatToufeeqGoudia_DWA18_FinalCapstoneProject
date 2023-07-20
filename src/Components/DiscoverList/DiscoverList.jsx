import { useState, useEffect } from 'react'
import Slider from 'react-slick';
import PropTypes from 'prop-types'

export default function DiscoverList({ shows }) {
    const [randomPodcasts, setRandomPodcasts] = useState([])
    
    useEffect(() => {
        
    }, [])

    return (
        <div>
        <h2>Random Podcasts</h2>
        <Slider>
          {randomPodcasts.map((podcast) => (
            <div key={podcast.id}>
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
              <img src={podcast.image} alt={podcast.title} />
            </div>
          ))}
        </Slider>
      </div>
    )
}

DiscoverList.propTypes = {
    shows: PropTypes.array
}