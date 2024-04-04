import { View, Image, Text } from "react-native";

function BookingCard(props) {
  const {
    photo,
    status,
    bookedBy,
    confirmationCode,
    bookingDate,
    vehicleName,
  } = props;
  // const date = new Date(bookingDate * 1000).toString();
  return (
    <View
      style={{
        width: 300,
        gap: 10,
        paddingVertical: 5,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#cecece",
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{status}</Text>

      {confirmationCode && <Text>{confirmationCode}</Text>}

      <Text>{bookingDate ? bookingDate : ""}</Text>
      <Text>{bookedBy}</Text>

      {photo.length > 0 && (
        <Image
          source={{ uri: photo }}
          style={{ width: 150, height: 150, objectFit: "contain" }}
        />
      )}
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{vehicleName}</Text>
    </View>
  );
}

export default BookingCard;
