import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Search } from 'react-native-feather';
import { useRouter } from 'expo-router';


const HomeSearchSection = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const router = useRouter();
  return (
  <>
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={setSearchValue}
        value={searchValue as string}
        placeholder="Enter search here"
        placeholderTextColor={'#707070'}
        />
        <TouchableOpacity  style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0ea5e9',
            borderRadius: 10,
            flex: 1,
            opacity: (searchValue && searchValue?.trim().length > 0) ? 1 : 0.2,
        } } onPress={() => {
          if (searchValue && searchValue?.trim().length > 0) {
            router.push(`/search?query=${searchValue as string}`)
            setSearchValue(prev => null);
          }
        }
        }>
          <Search
          color={"#fff"}
          width={20}
          height={20}
          strokeWidth={3}
          />
        </TouchableOpacity>
      </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 25,
    gap: 10,
  },
  input: {
    flex: 5,
    backgroundColor: '#fafafa',
    borderRadius: 7,
    paddingVertical: 14,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#d6d6d6',
  }
})

export default HomeSearchSection;
