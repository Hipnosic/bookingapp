import { useState, useEffect } from "react";
import { Session } from "../types/Session";
import requestService from "../service/requestService";

const useQuaryUser = (quary: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<Session[]>();
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await requestService.fetchSession();
        if (quary !== "") {
          const matchedData = response.filter((session) => session.date.includes(quary));
          setData(matchedData);
        } else {
          setData(response);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [quary]);
  return { isLoading, error, data };
};

export default useQuaryUser;
