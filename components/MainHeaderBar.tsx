import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { ArrowLeft } from "react-native-feather";

interface MainHeaderBarInterface {

}

const MainHeaderBar: React.FC<MainHeaderBarInterface> = () => {
  const router = useRouter();
  return (
  <>
    <Stack.Screen options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <>
            { (router.canGoBack()==true) ? (
              <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                <ArrowLeft 
                width={22} 
                height={22}
                strokeWidth={2.3}
                stroke={"#b0b0b0"}
                />
              </TouchableOpacity>
            ) : (
              <>
                  <Text style={styles.logoText}>Movie <Text style={{ color: '#0ea5e9' }}>Lookie</Text></Text>
              </>
            ) }
          </>
        ),
    }} />
  </>
  )
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#f5f5f5',
    padding: 4,
    borderRadius: 4000,
  },
  logoText: {
    fontSize: 23,
    fontWeight: 'bold',
  }
})

export default MainHeaderBar;


