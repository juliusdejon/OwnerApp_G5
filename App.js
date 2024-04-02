import { SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";
import HomeScreen from "./screens/Home";
import SignIn from "./screens/SignIn";
import ManageListing from "./screens/ManageListing";
import ManageBooking from "./screens/ManageBooking";
import ProfileScreen from "./screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth, signInWithEmailAndPassword, signOut } from "./firebaseConfig";

const Tab = createBottomTabNavigator();

export default function App() {
  const [userIsLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const onLogin = async (emailFromUI, passwordFromUI) => {
    console.log("LOGIN!");
    console.log(`Email: ${emailFromUI} \nPassword: ${passwordFromUI}`);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailFromUI,
        passwordFromUI
      );
      //who is the current user
      // console.log(userCredential.user.email);
      // alert(`Login Success! ${userCredential.user.email}`);
      setUserLoggedIn(true);
      setUser(userCredential.user.email);
    } catch (err) {
      alert("Invalid Credentials");
      console.log(err);
    }
  };

  const onLogout = async () => {
    try {
      //1. check if user is currently logged in
      if (auth.currentUser === null) {
        alert(`Sorry, no user is logged in.`);
      } else {
        await signOut(auth);
        alert(`Logout Complete!`);
        setUserLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userIsLoggedIn ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
                ),
              }}
            >
              {() => <HomeScreen user={user} />}
            </Tab.Screen>
            <Tab.Screen
              name="Manage Listing"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="pluscircleo" size={size} color={color} />
                ),
              }}
            >
              {() => <ManageListing user={user} />}
            </Tab.Screen>

            <Tab.Screen
              name="Manage Booking"
              component={ManageBooking}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="checkcircleo" size={size} color={color} />
                ),
              }}
            />

            <Tab.Screen
              name="Profile"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="user" size={size} color={color} />
                ),
              }}
            >
              {() => <ProfileScreen user={user} onLogout={onLogout} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <SignIn onLogin={onLogin} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
