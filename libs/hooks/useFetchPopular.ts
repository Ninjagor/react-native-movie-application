import { useState, useEffect } from "react";
import axios from "axios";
import fetch from "node-fetch";

// Ignore because it is a react-native-dotenv issue
// @ts-ignore
import {TMDB_BEARER_TOKEN} from "@env";

const useFetchPopular = (pageNumber: number) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);


  const fetchData = async (page: number) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    };
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, []);

  const refetch = (pageNumber: number) => {
    setIsLoading(true);
    fetchData(pageNumber);
    console.log(data)
  };

  return { data, isLoading, error, refetch };
};

export default useFetchPopular;
