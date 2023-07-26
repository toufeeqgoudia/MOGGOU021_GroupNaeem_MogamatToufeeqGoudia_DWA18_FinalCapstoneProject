import { Route, Routes } from 'react-router-dom';
import TopNav from '../../Components/Nav/TopNav';
import BottomNav from '../../Components/Nav/BottomNav';
import ShowList from '../../Components/ShowList/ShowList';
import EpisodeList from '../../Components/EpisodeList/EpisodeList'
import Favourites from '../Favourites/Favourites';
// import Recents from '../Recents/Recents';

const Home = () => {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/:showId/episodes" element={<EpisodeList />} />
        <Route path="/favourites" element={<Favourites />} />
        {/* <Route path="/recents" element={<Recents />} /> */}
      </Routes>
      <BottomNav />
    </>
  );
}

export default Home