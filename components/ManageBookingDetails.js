import { Button, Image, ScrollView, Text, View } from "react-native";
const ManageBookingDetails = ({ navigation, route }) => {
  const {
    id,
    vehicleMakeAndModel,
    vehiclePhoto,
    licensePlate,
    price,
    renterName,
    renterPhoto,
    bookingDate,
    bookingStatus,
    bookingConfirmationCode,
    pickupLocation,
  } = route.params;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#B3C8CF",
            margin: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#BED7DC",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "800",
              marginBottom: 5,
              alignItems: "center",
            }}
          >
            Booking Request Information
          </Text>
          <Text>Booking Confirmation Code: {bookingConfirmationCode}</Text>
          <Text>Vehicle: {vehicleMakeAndModel}</Text>
          <Text>License Plate: {licensePlate}</Text>
          <Text>Booked Date: {bookingDate}</Text>
          <Text>
            Pick Up Location: {pickupLocation}
          </Text>
          <Text>${price}/day</Text>
          <Text>Status: {bookingStatus}</Text>
          <Image
            style={{
              height: 250,
              width: "100%",
              borderRadius: 20,
            }}
            source={{ uri: vehiclePhoto }}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#B3C8CF",
            margin: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#BED7DC",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "800",
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            Renter Information
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                height: 150,
                width: 150,
                borderRadius: 25,
                borderWidth: 1,
              }}
              source={require('../assets/rental-memoji.jpeg')}
            />
            <View
              style={{
                justifyContent: "center",
                marginLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text>Renter: </Text>
              <Text>{renterName}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ManageBookingDetails;
