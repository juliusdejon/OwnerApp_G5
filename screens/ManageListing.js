import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";

import * as Location from "expo-location";

import Search from "../components/Search";
import Button from "../components/Button";

function ManageListing() {
  const [search, setSearch] = useState("");
  const [name, onChangeName] = useState("");
  const [photo, onChangePhoto] = useState("");
  const [seating, onChangeSeating] = useState("");
  const [msrp, onChangeMsrp] = useState("");
  const [driveTrain, onChangeDriveTrain] = useState("");
  const [licensePlate, onChangeLicensePlate] = useState("");
  const [address, onChangeAddress] = useState("");
  const [price, onChangePrice] = useState("");

  const onCreateListing = () => {
    // TODO: insert listing to firebase
  };

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const res = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const c = res[0];
      onChangeAddress(`${c.name}, ${c.city}, ${c.country}`);
    })();
  }, []);

  const fetchVehicles = async (value) => {
    try {
      const response = await fetch(
        "https://juliusdejon.github.io/gbc.github.io/vehicles.json"
      );
      const results = await response.json();
      // find by vehicle make
      const nextResults = results.data.filter((data) => {
        return data.make.includes(value);
      });

      setVehicles(nextResults);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectSuggestion = (vehicle) => {
    onChangeName(`${vehicle.make} ${vehicle.model} ${vehicle.trim}`);
    onChangePhoto(vehicle.images[0].url_full);
    onChangeSeating(`${vehicle.seats_max}`);
    onChangeDriveTrain(vehicle.drivetrain);
    onChangeMsrp(`${vehicle.msrp}`);
    setVehicles([]);
    setSearch("");
  };

  const onSearch = (value) => {
    setSearch(value);
    if (value.length == 0) {
      setVehicles([]);
    } else {
      fetchVehicles(value);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
        gap: 2,
      }}
    >
      <Text style={styles.label}>Search for existing vehicle</Text>
      <Search
        value={search}
        data={vehicles}
        onSelectItem={onSelectSuggestion}
        onChangeText={onSearch}
      />
      <View style={{ marginBottom: 24 }} />
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* <Text>Photo</Text> */}
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangePhoto}
          value={photo}
        /> */}
        {photo.length > 0 && (
          <Image
            source={{ uri: photo }}
            style={{ height: 150, width: 200, objectFit: "contain" }}
          />
        )}
      </View>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
        />
        <View style={{ paddingHorizontal: 16 }}></View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Seating</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeSeating}
            value={seating}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>MSRP</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeMsrp}
            value={msrp}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Drive Train</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeDriveTrain}
            value={driveTrain}
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>License Plate</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLicensePlate}
          value={licensePlate}
        />
      </View>

      <View>
        <Text style={styles.label}>Pickup location address</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
        />
      </View>

      <View>
        <Text style={styles.label}>Rental Price</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrice}
          value={price}
        />
      </View>
      <Button onPress={onCreateListing} label="Create Listing" />
      <View style={{ paddingBottom: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#333333",
    fontWeight: "600",
  },
  input: {
    height: 38,
    marginBottom: 18,
    marginTop: 6,
    borderWidth: 2,
    borderColor: "#dedede",
    borderRadius: 10,
    color: "#333333",
    backgroundColor: "#F9FAFB",
    padding: 10,
  },
  title: {
    color: "black",
  },
});

export default ManageListing;
