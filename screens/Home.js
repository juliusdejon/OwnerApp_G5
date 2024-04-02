import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const avatar = require("../assets/memoji.png");

function Card() {
  return (
    <View
      style={{
        width: "100%",
        height: 200,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#cecece",
      }}
    ></View>
  );
}

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
          gap: 20,
        }}
      >
        <Image source={avatar} style={{ width: 60, height: 100 }} />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Welcome back 👋
          </Text>
          <Text style={{ fontSize: 28, fontWeight: "700" }}>Julius Dejon</Text>
        </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>My Listings</Text>
        <Card />
      </View>

      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>My Bookings</Text>
        <Card />
      </View>
    </View>
  );
}

export default HomeScreen;
