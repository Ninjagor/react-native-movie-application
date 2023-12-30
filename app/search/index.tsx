import { Stack, Link, useLocalSearchParams , useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator,  StatusBar, ScrollView } from "react-native"
import useFetchBySearch from '../../libs/hooks/useFetchBySearch'
import MainHeaderBar from '../../components/MainHeaderBar'
import { AggregateDataType } from '../../components/home/PopularMoviesSection'
import { MovieObjectInterface } from '../../components/home/PopularMoviesSection'
import MovieCard from '../../components/home/movieresults/MovieCard'

const Search = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const router = useRouter()
  React.useEffect(() => {
    if (!query) {
      router.push('/home')
    }
  }, [])
  const [currPage, setCurrPage] = React.useState<number>(1)
  const { data, isLoading, error, refetch } = useFetchBySearch(currPage, query as string);
  const [aggregateData, setAggregateData] = React.useState<AggregateDataType>(data);
  React.useEffect(() => {
    if (data !== undefined) {
      setAggregateData((prevData) => {
        // TS error ignoring since it has no effect on results
        // @ts-ignore
        return prevData ? [...prevData, ...data] : data;
      })
    }
  }, [data])
  useEffect(() => {
    console.log(`AGG_SEARCH: ${JSON.stringify(aggregateData)}`)
  }, [aggregateData])

  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1 }}>
        <StatusBar
        animated={true}
        barStyle="dark-content"
        />
        <MainHeaderBar />
        <ScrollView style={styles.scrollView}>
          <Text style={{ fontSize: 18, fontWeight: '400', opacity: 0.4 }}>Showing results for</Text>
          <Text style={{ fontSize: 30, fontWeight: '600', marginTop: 7 }}>{query}</Text>
                        <View style={styles.constainer}>
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

        </ScrollView> 


      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    marginTop: 25,
  },
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

export default Search; 
