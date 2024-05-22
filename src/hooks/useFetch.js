import { useEffect, useState } from "react";

export const useFetch = (url = "") => {
  const [isState, setIsState] = useState({
    data: null,
    isLoading: false,
    hasError: null,
  });

  const getFetch = async () => {
    setIsState({
      ...isState,
      isLoading: true,
    });

    try {
      const resp = await fetch(url);
      const data = await resp.json();

      setIsState({
        data,
        isLoading: false,
        hasError: null,
      });
    } catch (error) {
      setIsState({
        data: null,
        isLoading: false,
        hasError: error.message,
      });
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: isState.data,
    isLoading: isState.isLoading,
    hasError: isState.hasError,
  };
};
