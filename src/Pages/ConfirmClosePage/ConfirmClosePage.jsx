import { useEffect } from "react";
import { usePlayer } from "../../Hooks/usePlayer";

const ConfirmClosePage = () => {
  const { currentEpisode } = usePlayer();

  useEffect(() => {
    if (currentEpisode) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [currentEpisode]);

  return null;
};

export default ConfirmClosePage;
