import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";

const BookingsListItem = (props) => {
  const { bookingCode, photo, price, status, goToDetails, accept, decline } =
    props;

  let addressBackgroundColor;

  switch (status) {
    case "Accepted":
      addressBackgroundColor = "green";
      break;
    case "Declined":
      addressBackgroundColor = "red";
      break;
    default:
      addressBackgroundColor = "#34495e"; // Default background color
      break;
  }

  return (
    <View>
      <TouchableOpacity onPress={goToDetails}>
        <View
          style={{
            width: 300,
            height: 200,
            marginTop: 15,
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: "#cecece",
            marginHorizontal: 10,
          }}
        >
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          <View
            style={{
              position: "absolute",
              color: "black",
              borderRadius: 30,
              backgroundColor: "#f1c40f",
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 0,
              top: -6,
              left: -6,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                paddingHorizontal: 20,
                paddingVertical: 5,
                color: "black",
              }}
            >
              {price ? `$${price}` : price}
            </Text>
          </View>

          {/* if bookingCode is not equal to empty array, show Code in UI */}
          {bookingCode !== "" && <View
            style={{
              position: "absolute",
              color: "black",
              borderRadius: 30,
              backgroundColor: "#f1c40f",
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 0,
              top: -6,
              right: -6,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                paddingHorizontal: 20,
                paddingVertical: 5,
                color: "black",
              }}
            >
              {bookingCode}
            </Text>
          </View>}

          <View
            style={{
              position: "absolute",
              bottom: 0,
              fontSize: 16,
              height: 30,
              width: 300,
              borderRadius: 100,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              backgroundColor: addressBackgroundColor,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 5,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "green",
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={accept}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Accept
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "red",
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={decline}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BookingsListItem;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "beige",
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
});
