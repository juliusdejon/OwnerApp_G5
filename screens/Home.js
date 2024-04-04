import { ScrollView, View, Text, Image } from "react-native";
import Card from "../components/Card";
import BookingCard from "../components/BookingCard";
import React, { useState, useEffect } from "react";
import {
  getRentalListingsByEmail,
  getBookingsOfOwner,
} from "../firebaseConfig";
const avatar = require("../assets/memoji.png");

function HomeScreen(props) {
  const { user } = props;
  const [myListings, setMyListings] = useState([]);
  const [myBookings, setBookings] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const listings = await getRentalListingsByEmail(user);
      setMyListings(listings);
    }
    async function fetchBookings() {
      const bookings = await getBookingsOfOwner(user);
      setBookings(bookings);
    }
    fetchData();
    fetchBookings();
  }, [user]);

  return (
    <ScrollView
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
              name={listing.name}
              address={listing.address}
              licensePlate={listing.licensePlate}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>My Bookings</Text>
        <ScrollView horizontal={true} contentContainerStyle={{}}>
          {myBookings.length === 0 && (
            <Text style={{ paddingVertical: 80 }}>Empty Listings</Text>
          )}
          {myBookings.map((booking, index) => (
            <BookingCard
              key={`${booking.vehicleDetails.name}-${index}`}
              photo={booking.vehicleDetails.image}
              status={booking.status}
              confirmationCode={booking.confirmationCode}
              bookingDate={booking.bookingDate}
              bookedBy={booking.userEmail}
              vehicleName={booking.vehicleDetails.name}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
