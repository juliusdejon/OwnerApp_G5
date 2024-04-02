import React, { useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

function HomeScreen() {
  const [name, onChangeName] = useState("");
  const [photo, onChangePhoto] = useState("");
  const [seating, onChangeSeating] = useState("");
  const [type, onChangeType] = useState("");
  const [color, onChangeColor] = useState("");
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
      const nextResults = results.data.filter((data) => {
        return data.name.includes(value);
      });

      setVehicles(nextResults);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectSuggestion = (vehicle) => {
    onChangeName(vehicle.name);
    onChangePhoto(vehicle.photo);
    onChangeSeating(vehicle.seating_capacity);
    onChangeType(vehicle.type);
    onChangeColor(vehicle.color);
  };

  const Item = (item) => {
    return (
      <TouchableOpacity onPress={() => onSelectSuggestion(item.item)}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onSearch = (value) => {
    onChangeName(value);

    fetchVehicles(value);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, gap: 2 }}>
      <Text style={{ marginBottom: 16 }}>Create Listing</Text>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          returnKeyType="search"
          onChangeText={onSearch}
          value={name}
        />
        {/* Todo  Styling*/}
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={vehicles}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item, index) => `${item.name}-${index}`}
          />
        </View>
      </View>
      {/* TODO: Add Expo camera? */}
      <View>
        <Text>Photo</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePhoto}
          value={photo}
        />
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
        <Text>Type</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeType}
          value={type}
        />
      </View>

      <View>
        <Text>Color</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeColor}
          value={color}
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

export default HomeScreen;
