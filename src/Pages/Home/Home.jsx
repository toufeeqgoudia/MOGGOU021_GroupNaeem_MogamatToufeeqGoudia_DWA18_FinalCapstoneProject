import ShowList from '../../Components/ShowList/ShowList';
import SeasonList from '../../Components/SeasonList/SeasonList';
// import EpisodeList from '../../Components/EpisodeList/EpisodeList'

export default function Home() {
  return (
    <>
      <ShowList path='/' />
      <SeasonList path='/' />
    </>
  );
}
