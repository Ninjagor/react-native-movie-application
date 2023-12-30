import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { MovieObjectInterface } from '../PopularMoviesSection'
import { useRouter } from 'expo-router';

export interface MovieCardInterface {
  movieData: MovieObjectInterface;
}

const MovieCard: React.FC<MovieCardInterface> = ({ movieData }) => {
  const router = useRouter();
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  const backdropPath = movieData.backdrop_path || movieData.poster_path || '';
  return (
  <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={{
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: '#f5f5f5',
            position: 'absolute',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontWeight: '600',
              opacity: 0.5
            }}>No Image Found.</Text>
          </View>
          <Image
            source={{ uri: `${baseImageUrl}${backdropPath}` }}
            style={styles.image}
          />
          <Text style={styles.releaseDate}>{movieData.release_date}</Text>
        </View>
        <Text style={styles.titleText}>{movieData.original_title}</Text>
        <Text style={styles.overviewText}>{movieData.overview}</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {
          router.push(`/overview?query=${movieData.id}`)
        }}>
          <Text style={styles.buttonText}>More Information</Text>
        </TouchableOpacity>
      </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
    borderRadius: 15,
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
    opacity: 0.9, 
  },
  titleText: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.6,
    marginVertical: 10,
    marginTop: 18,
    paddingHorizontal: 7,
  },
  overviewText: {
    fontSize: 12,
    flex: 1,
    width: '100%',
    textAlign: 'center',
    opacity: 0.5,
  },
  releaseDate: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: 'white',
    fontWeight: '600',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9',
    paddingVertical: 13,
    paddingHorizontal: 7,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  }
})

export default MovieCard
