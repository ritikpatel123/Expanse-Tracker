//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

// create a component
const Input = ({ label, style, TextInputConfig, inValid }) => {
  const inputStyles = [styles.input];

  if (TextInputConfig && TextInputConfig.multiline) {
    inputStyles.push(styles.inputmultiline);
  }
  if (inValid) {
    inputStyles.push(styles.inValidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, inValid && styles.inValidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...TextInputConfig} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputmultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inValidLabel: {
    color: GlobalStyles.colors.error500,
  },
  inValidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

//make this component available to the app
export default Input;
