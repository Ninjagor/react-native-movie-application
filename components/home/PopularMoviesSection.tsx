import React, { Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import useFetchPopular from '../../libs/hooks/useFetchPopular';
import MovieCard, { MovieCardInterface } from './movieresults/MovieCard';

export interface MovieObjectInterface {
  adult: boolean;
  backdrop_path: boolean;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type AggregateDataType = MovieObjectInterface[] | null | undefined;

const PopularMoviesSection = () => {
  const [currPage, setCurrPage] = React.useState<number>(1)
  const { data, isLoading, error, refetch } = useFetchPopular(currPage);
  const [aggregateData, setAggregateData] = React.useState<AggregateDataType>(data);
  React.useEffect(() => {
    if (data !== undefined) {
      setAggregateData((prevData) => {
        return prevData ? [...prevData, ...data] : data;
      })
    }
  }, [data])
  return (
  <>
      <View style={styles.constainer}>
        <Text style={styles.title}>Popular Movies</Text>
        { isLoading && (
          <ActivityIndicator size='large' color='#bababa' style={{ alignSelf: 'flex-start', marginTop: 20 }} />
        ) }
        { (aggregateData) 
          &&
          aggregateData.map((item, count) => {
            return (
              <MovieCard movieData={item as MovieObjectInterface} key={`card_${item.id}${count}`}/>
            )
          })
        }
        <TouchableOpacity onPress={() => {
          setCurrPage(prev => currPage+1)
          refetch(currPage+1)
        }}>
          <Text style={{
            marginVertical: 10,
            marginBottom: 50,
            fontSize: 17,
            color: '#0ea5e9',
            fontWeight: '500'
          }}>See More</Text>
        </TouchableOpacity>
      </View>
  </>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    marginTop: 25,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    opacity: 0.5
  }
})

export default PopularMoviesSection
