import { Stack, Link, useLocalSearchParams , useRouter } from 'expo-router'
import React from 'react'
import { View, Image, ActivityIndicator, TouchableOpacity, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from "react-native"
import MainHeaderBar from '../../components/MainHeaderBar'
import useFetchById from '../../libs/hooks/useFetchById'

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  date.setDate(date.getDate() + 1);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
}

const Overview = () => {
  const { query } = useLocalSearchParams<{ query?: string }>();
  const router = useRouter()
  React.useEffect(() => {
    if (!query) {
      router.push('/home')
    }
  }, [])
  const { data, isLoading, error} = useFetchById(query as string);
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  const backdropPath = data?.poster_path || data?.backdrop_path || '';
  React.useEffect(() => {
    console.log(`MOVIE DATA: ${JSON.stringify(data)}`)
  }, [data])
  return (
    <>
      <View style={{backgroundColor: 'white', flex: 1 }}>
        <StatusBar
        animated={true}
        barStyle="dark-content"
        />
        <MainHeaderBar />
        <ScrollView style={styles.scrollView}>
          { isLoading ? (
          <>
          <ActivityIndicator size='large' color='#bababa' style={{ alignSelf: 'flex-start', marginTop: 20 }} />
          </>
          ) : (
          <>
            <View style={styles.imgContainer}>
              <Image
                source={{ uri: `${baseImageUrl}${backdropPath}` }}
                style={styles.image}
              />
              <View 
              style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />
              <View 
              style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />

              <Text style={{
                    position: 'absolute',
                    bottom: 50,
                    color: 'white',
                    fontSize: 25,
                    fontWeight: '700',
                    opacity: 0.9,
                    width: '100%',
                    textAlign: 'center',
                    paddingHorizontal: 18,
                  }}>
                {data?.title}
              </Text>
            </View>
            <View style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  marginTop: 30,
                  gap: 8
                }}>
            <Text style={{
                    fontSize: 20,
                    fontWeight: '600',
                    opacity: 0.6,
                  }}>Description</Text>
            <Text style={{
                    fontSize: 13,
                    fontWeight: '500',
                    opacity: 0.45,
                  }}>{data?.overview}</Text>



            <Text style={{
                    fontSize: 20,
                    fontWeight: '600',
                    opacity: 0.6,
                    marginTop: 20,
                  }}>Release Date</Text>
            <Text style={{
                    fontSize: 13,
                    fontWeight: '500',
                    opacity: 0.45,
                  }}>This movie was released on {formatDate(data?.release_date as string)}.</Text>



            <Text style={{
                    fontSize: 20,
                    fontWeight: '600',
                    opacity: 0.6,
                    marginTop: 20,
                  }}>Ratings</Text>
            <Text style={{
                    fontSize: 13,
                    fontWeight: '500',
                    opacity: 0.45,
                  }}>This movie was rated {data?.vote_average} stars out of 10.</Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {
            router.back()
          }}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>

            </View>
          </>
          ) }
        </ScrollView> 
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  imgContainer :{
    width: '100%',
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.9, 
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9',
    paddingVertical: 13,
    paddingHorizontal: 7,
    marginTop: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  }
})

export default Overview; 
