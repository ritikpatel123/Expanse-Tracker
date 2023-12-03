//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";

// create a component
const ExpanseForm = ({onCancle, onSubmit,isEditing,deafultValues}) => {
  const [inputValues, setInputValues] = useState({
    amount: deafultValues?deafultValues.amount.toString():'',
    date: deafultValues?deafultValues.date.toISOString().slice(0,10):'',
    description: deafultValues?deafultValues.description.toString():'',
  });
  function inputChangeHandler(intputIdentifier, enteredvalue) {
    setInputValues((prev) => {
      return {
        ...prev,
        [intputIdentifier]: enteredvalue,
      };
    });
  }
function submitHandler(){
  const expanseData ={
    amount:+inputValues.amount,
    date:new Date(inputValues.date),
    description:inputValues.description,
  }

  onSubmit(expanseData);
};
  return (
    <View>
      <Text style={styles.title}>Your Expanse</Text>
      <View style={styles.inputsrow}>
        <Input
          style={styles.rowinput}
          label={"Amount"}
          TextInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />

        <Input
          label={"Date"}
          style={styles.rowinput}
          TextInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label={"Description"}
        TextInputConfig={{
          multiline: true,
          // autoCorrect:false
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancle}>
          Cancle
        </Button>

        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowinput: {
    flex: 1,
  },
});

export default ExpanseForm;
