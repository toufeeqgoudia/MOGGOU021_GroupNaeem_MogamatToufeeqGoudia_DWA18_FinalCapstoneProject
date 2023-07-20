import ShowList from '../../Components/ShowList/ShowList';
import SeasonList from '../../Components/SeasonList/SeasonList';
// import EpisodeList from '../../Components/EpisodeList/EpisodeList'

const Home = () => {
  return (
    <>
      <ShowList path='/' />
      <SeasonList path='/' />
    </>
  );
}

export default Home