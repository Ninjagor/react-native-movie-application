import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

const GreetingsSection = () => {
  return (
  <>
      <View style={styles.container}>
        <Text style={styles.smallText}>Welcome Back, Rohit</Text>
        <Text style={styles.bigText}>Explore Top Movies</Text>
      </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
  smallText: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.5
  },
  bigText: {
    fontSize: 25,
    fontWeight: '600',
    opacity: 0.9,
  }
})

export default GreetingsSection
