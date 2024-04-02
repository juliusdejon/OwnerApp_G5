import React, { useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import Search from "../components/Search";

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

  const fetchVehicles = async (value) => {
    try {
      const response = await fetch(
        "https://juliusdejon.github.io/gbc.github.io/vehicles.json"
      );
      const results = await response.json();
      console.log(results);
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
      style={{ flex: 1, padding: 16, gap: 2, backgroundColor: "white" }}
    >
      <Search
        value={search}
        data={vehicles}
        onSelectItem={onSelectSuggestion}
        onChangeText={onSearch}
      />
      <View style={{ marginBottom: 6 }} />
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* <Text>Photo</Text> */}
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangePhoto}
          value={photo}
        /> */}
        <Image
          source={{ uri: photo }}
          style={{ height: 200, width: 200, objectFit: "contain" }}
        />
      </View>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
        />
        <View style={{ paddingHorizontal: 16 }}></View>
      </View>

      <View>
        <Text>Seating</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSeating}
          value={seating}
        />
      </View>

      <View>
        <Text>Drive Train</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDriveTrain}
          value={driveTrain}
        />
      </View>

      <View>
        <Text>MSRP</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeMsrp}
          value={msrp}
        />
      </View>

      <View>
        <Text>License Plate</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLicensePlate}
          value={licensePlate}
        />
      </View>

      <View>
        <Text>Pickup location address</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAddress}
          value={address}
        />
      </View>

      <View>
        <Text>Rental Price</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrice}
          value={price}
        />
      </View>
      <Button onPress={onCreateListing} title="Create Listing" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    color: "black",
  },
});

export default ManageListing;
