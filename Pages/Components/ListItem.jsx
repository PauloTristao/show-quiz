import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

const ListItem = ({ textValue, handleLongPress, handleEdit, handleDelete }) => {
  return (
    <TouchableOpacity
      style={styles.itemForm}
      onLongPress={() => {
        handleLongPress();
      }}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{textValue}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleEdit();
            }}
          >
            <Image
              source={require("../../assets/pencil.png")}
              style={styles.fastIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
          >
            <Image
              source={require("../../assets/delete.png")}
              style={styles.fastIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemForm: {
    height: 50,
    borderRadius: 15,
    borderColor: "#dbd9d9",
    borderWidth: 2,
    backgroundColor: "#dbd9d9",
    marginBottom: 5,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 15,
    width: "75%",
  },
  fastIcon: {
    width: 25,
    height: 25,
  },
});
