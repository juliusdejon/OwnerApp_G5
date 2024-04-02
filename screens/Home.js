import { ScrollView, View, Text, Image } from "react-native";
import Card from "../components/Card";
import React, { useState, useEffect } from "react";
import { getRentalListingsByEmail } from "../firebaseConfig";
const avatar = require("../assets/memoji.png");

function HomeScreen(props) {
  const { user } = props;
  const [myListings, setMyListings] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const results = await getRentalListingsByEmail(user);
      console.log(results);
      setMyListings(results);
    }
    fetchData();
  }, [user]);

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
          <Text style={{ fontSize: 28, fontWeight: "700" }}>{user}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>My Listings</Text>
        <ScrollView horizontal={true} contentContainerStyle={{}}>
          {myListings.length === 0 && (
            <Text style={{ paddingVertical: 80 }}>Empty Listings</Text>
          )}
          {myListings.map((listing, index) => (
            <Card
              key={`${listing.name}-${index}`}
              photo={listing.photo}
              price={listing.price}
              address={listing.address}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>My Bookings</Text>
        <Card />
      </View>
    </View>
  );
}

export default HomeScreen;
