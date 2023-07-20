import { Route, Routes } from 'react-router-dom';
import TopNav from './Components/Nav/TopNav';
import BottomNav from './Components/Nav/BottomNav';
import ShowList from './Components/ShowList/ShowList';
import EpisodeList from './Components/EpisodeList/EpisodeList';
// import Home from './Pages/Home/Home';
// import Login from './Pages/Login/Login'

function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/:showId/:season" element={<EpisodeList />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
