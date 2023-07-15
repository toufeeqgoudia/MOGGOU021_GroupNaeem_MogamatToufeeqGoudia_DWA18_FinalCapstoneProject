import { Route, Routes } from 'react-router-dom';
import TopNav from './Components/Nav/TopNav';
import BottomNav from "./Components/Nav/BottomNav";
import Shows from './TestFolder/Shows';
// import ShowList from './Components/ShowList/ShowList';
// import Home from './Pages/Home/Home';
// import Login from './Pages/Login/Login'


function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Shows />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
