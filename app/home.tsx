import { Stack, Link } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from "react-native"
import MainHeaderBar from '../components/MainHeaderBar'
import GreetingsSection from '../components/home/GreetingsSection'
import HomeSearchSection from '../components/home/HomeSearchSection'
import PopularMoviesSection from '../components/home/PopularMoviesSection'

const Home = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1 }}>
        <StatusBar
        animated={true}
        barStyle="dark-content"
        />
        <MainHeaderBar />
        <ScrollView style={styles.scrollView}>
          <GreetingsSection />
          <HomeSearchSection />
          <PopularMoviesSection />
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
  }
})

export default Home
