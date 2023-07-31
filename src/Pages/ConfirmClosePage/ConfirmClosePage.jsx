import { useEffect } from "react";

const ConfirmClosePage = () => {

  useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
  }, []);

  return null;
};

export default ConfirmClosePage;
