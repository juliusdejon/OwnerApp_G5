import { TouchableOpacity, View, Text } from "react-native";

function Button(props) {
  const { label, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 160,
          height: 42,
          borderRadius: 10,
          backgroundColor: "#16a085",
          flex: 1,
          alignSelf: "center", // remove this if needed
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
