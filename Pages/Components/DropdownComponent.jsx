import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const DropdownComponent = ({
  data,
  style,
  setSelectedLabel,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <Dropdown
      style={style}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={selectedValue ? selectedValue : "Select theme"}
      searchPlaceholder="Search..."
      onChange={(item) => {
        setSelectedLabel(item.label);
        setSelectedValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#4B0082",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#4B0082",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
