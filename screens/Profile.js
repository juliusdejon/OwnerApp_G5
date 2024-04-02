import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
function ProfileScreen(props) {
  const { onLogout, user } = props;
  return (
    <View style={styles.logoutContainer}>
      <Text style={styles.welcomeText}>Welcome, {user}</Text>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "beige",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 2,
    borderColor: "black",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
