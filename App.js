import { SafeAreaView, StyleSheet } from "react-native";
import ListingScreen from "./screens/ListingScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ListingScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
