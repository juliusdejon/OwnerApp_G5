import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // You may need to install this package

function Search(props) {
  const { value, onChangeText, data, onSelectItem } = props;

  return (
    <View>
      <View style={styles.container}>
        <AntDesign
          name="search1"
          size={16}
          color={"#ccc"}
          style={styles.icon}
        />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {data.length > 0 && (
        <ScrollView style={{ maxHeight: 120 }}>
          {data.map((d) => (
            <TouchableOpacity
              key={d.display_name}
              onPress={() => onSelectItem(d)}
            >
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderColor: "#ccc",
                  borderWidth: 0.5,
                  borderTopWidth: 0,
                  borderRadius: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {`${d.make} ${d.model} ${d.trim}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    paddingVertical: 10,
    height: 38,
    paddingHorizontal: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
export default Search;
