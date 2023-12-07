//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

// create a component
const ExpanseForm = ({ onCancle, onSubmit, isEditing, deafultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: deafultValues ? deafultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: deafultValues ? deafultValues.date.toISOString().slice(0, 10) : "",
      isValid:true,
    },
    description: {
      value: deafultValues ? deafultValues.description.toString() : "",
      isValid:true,
    },
  });
  function inputChangeHandler(intputIdentifier, enteredvalue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [intputIdentifier]: {value:enteredvalue, isValid:true}
      }; 
    });
  }
 
  function submitHandler() {
    const expanseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expanseData.amount) && expanseData.amount > 0;
    const dateIsValid = expanseData.date.toString() !== " Invalid date";
    const descriptionIsValid = expanseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {

      setInputs((currInputs)=>{
        return {
        amount:{value:currInputs.amount.value,isValid:amountIsValid},
        date:{value:currInputs.date.value,isValid:dateIsValid},
        description:{value:currInputs.description.value,isValid:descriptionIsValid},
        }
      })
      return;
    }
    onSubmit(expanseData); 
  }
  const formIsValid= !inputs.date.isValid ||!inputs.description.isValid ||!inputs.amount.isValid;
  return (
    <View>
      <Text style={styles.title}>Your Expanse</Text>
      <View style={styles.inputsrow}>
        <Input
          style={styles.rowinput}
          label={"Amount"}
          inValid={!inputs.amount.isValid}
          TextInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />

        <Input
          label={"Date"}
          style={styles.rowinput}
          inValid={!inputs.date.isValid}
          TextInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        inValid={!inputs.description .isValid}
        TextInputConfig={{
          multiline: true,
          // autoCorrect:false
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
       {formIsValid && (<Text style={styles.errortext}>Invalid Input Values -Please check your entered data!</Text>)}
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
  errortext:{
    textAlign:'center',
    color:GlobalStyles.colors.error500,
    margin:8

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
