import { useState, useEffect } from "react";
import axios from "axios";
import { MovieObjectInterface } from "../../components/home/PopularMoviesSection";

// Ignore because it is a react-native-dotenv issue
// @ts-ignore
import {TMDB_BEARER_TOKEN} from "@env";


const useFetchById = (movieId: string) => {
  const [data, setData] = useState<MovieObjectInterface | null | undefined>()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);


  const fetchData = async (movieId: string) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
      }
    };
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(movieId);
  }, []);

  return { data, isLoading, error };
};

export default useFetchById;
