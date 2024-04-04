import { Button, Image, Text, View } from "react-native";
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
    pickupLat,
    pickupLng,
  } = route.params;

  return (
    <View style={{ flex: 1 }}>
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
          <Text>Pick Up Location: {pickupLat}, {pickupLng}</Text>
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
                height: 200,
                width: 200,
                borderRadius: 20,
                borderWidth: 1,
              }}
              source={{ uri: renterPhoto }}
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
    </View>
  );
};
export default ManageBookingDetails;
