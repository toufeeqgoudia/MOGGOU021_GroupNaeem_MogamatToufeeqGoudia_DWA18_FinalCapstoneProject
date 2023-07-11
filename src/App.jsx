// import { Route, Router } from 'react-router-dom';
import TopNav from './Components/Nav/TopNav';
import BottomNav from "./Components/Nav/BottomNav";
// import Home from './Pages/Home/Home';
import ShowList from './Components/ShowList/ShowList';
// import Login from './Pages/Login/Login'

function App() {
  return (
    <>
      <TopNav />
      <ShowList />
      <BottomNav />
    </>
  );
}

export default App;
