import { Link, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import MainHeaderBar from '../components/MainHeaderBar';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <MainHeaderBar />
        <StatusBar
        animated={true}
        barStyle="dark-content"
        />
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorTitle}>404</Text>
          <Text style={styles.title}>This screen doesn't exist.</Text>

          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </Link>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  errorTitle: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
