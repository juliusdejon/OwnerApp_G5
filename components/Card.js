import { View, Image, Text } from "react-native";

function Card(props) {
  const { photo, price, address } = props;
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
      <Image
        source={{ uri: photo }}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      <Text
        style={{
          position: "absolute",
          fontWeight: "bold",
          fontSize: 18,
          top: 12,
          color: "black",
          left: 16,
        }}
      >
        {price ? `$${price}` : price}
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 6,
          fontSize: 10,
          left: 50,
          right: 50,
        }}
      >
        {address}
      </Text>
    </View>
  );
}

export default Card;
