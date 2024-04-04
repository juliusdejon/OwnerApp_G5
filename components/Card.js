import { View, Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

function Card(props) {
  const { photo, price, address, name, licensePlate } = props;
  return (
    <View
      style={{
        width: 300,
        height: 200,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#cecece",
        marginHorizontal: 10,
      }}
    >
      {photo.length > 0 && (
        <Image
          source={{ uri: photo }}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}
      <Text>{name}</Text>
      <View
        style={{
          position: "absolute",
          color: "black",
          borderRadius: 30,
          backgroundColor: "#FFD500",
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
      <View
        style={{
          position: "absolute",
          color: "black",
          backgroundColor: "#f1c40f",
          bottom: 70,
          left: 40,
          transform: [{ rotate: "5deg" }],
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 8,
            paddingHorizontal: 5,
            color: "black",
          }}
        >
          {licensePlate}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          color: "black",
          borderRadius: 30,
          backgroundColor: "#A6051A",
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          top: 6,
          right: 6,
          width: 190,
          alignItems: "center",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "700",
            fontSize: 15,
            paddingHorizontal: 20,
            paddingVertical: 5,
            color: "white",
          }}
        >
          {name}
        </Text>
      </View>
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
          backgroundColor: "black",
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
          <Entypo name="location-pin" size={24} color="white" />
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Card;
