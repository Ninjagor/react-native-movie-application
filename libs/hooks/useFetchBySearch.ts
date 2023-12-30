import { useState, useEffect } from "react";
import axios from "axios";
import { MovieObjectInterface } from "../../components/home/PopularMoviesSection";

// Ignore because it is a react-native-dotenv issue
// @ts-ignore
import {TMDB_BEARER_TOKEN} from "@env";

const useFetchBySearch = (pageNumber: number, query: string) => {
  const [data, setData] = useState<MovieObjectInterface[] | undefined | null>()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);


  const fetchData = async (page: number, query: string) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
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
    fetchData(pageNumber, query);
  }, []);

  const refetch = (pageNumber: number) => {
    setIsLoading(true);
    fetchData(pageNumber, query);
    console.log(data)
  };

  return { data, isLoading, error, refetch };
};

export default useFetchBySearch;
