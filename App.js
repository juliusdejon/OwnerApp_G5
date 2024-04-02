import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import HomeScreen from "./screens/Home";
import ManageListing from "./screens/ManageListing";
import ManageBooking from "./screens/ManageBooking";
import ProfileScreen from "./screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Manage Listing"
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="pluscircleo" size={size} color={color} />
              ),
            }}
            component={ManageListing}
          />

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
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
