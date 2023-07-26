import Button from "@mui/material/Button";


const Recents = () => {

  const handleClearRecentEpisodes = () => {

  };




  return (
    <div className="mt-16">
      <h3>Recently listened to:</h3>
      {recentEpisodes.length > 0 ? (
        <p>No recently listened episodes yet.</p>
      ) : (
        <div>
          <Button variant="contained" onClick={handleClearRecentEpisodes}>
            Reset All Progress
          </Button>
          {recentEpisodes.map((episode) => (
            <div
            key={episode.title}
            className="max-w-screen min-h-48 bg-gray-300 mx-2 mb-2 rounded-lg"
          >
            <h4 className="text-sm px-1.5 py-1 font-bold">
              {episode.title}
            </h4>
            <p className="text-xs px-1.5 pb-1">{episode.description}</p>
          </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recents;
