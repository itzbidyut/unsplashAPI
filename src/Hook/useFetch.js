import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // const APIkey = `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;
  // //  URI = `/photos/?client_id=${APIkey}`;
  // const pageNumber = 10;
  // const URI = `/search/photos/?page=${pageNumber}&query=girl&client_id=${APIkey}`;

  // const finalURL = `https://api.unsplash.com${URI}`;

  const getApiData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url).then((response) => response.json());
      console.log(response);
      //   setImages(response.results);
    } catch (err) {
      setError(ture);
      console.log("fetch error occur", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, [url]);

  return {
    response,
    isLoading,
    error,
  };
};
