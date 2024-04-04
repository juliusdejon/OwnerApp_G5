import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NoBookings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Booking Requests</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NoBookings;
