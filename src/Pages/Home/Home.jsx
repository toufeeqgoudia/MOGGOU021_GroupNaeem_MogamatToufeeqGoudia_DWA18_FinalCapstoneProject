import ShowList from '../../Components/ShowList/ShowList';
import SeasonList from '../../Components/SeasonList/SeasonList';

export default function Home() {
  return (
    <>
      <ShowList path='/shows' />
      <SeasonList path='/seasons' />
    </>
  );
}
