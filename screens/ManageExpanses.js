import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButtons from "../Component/UI/IconButtons";
import { GlobalStyles } from "../constants/styles";
import Button from "../Component/UI/Button";
import { ExpenseContext } from "../store/expanses-context";
import ExpanseForm from "../Component/ManageExpanse/ExpanseForm.js";

const ManageExpanses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpanse = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expanse" : "Add Expanse",
    });
  }, [isEditing, navigation]);

  function deleteExpanseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancleHandler() {
    navigation.goBack();
  }
  function confirmHandler(expanseData) {
    // console.log(expensesCtx); // Check if deleteExpense function exists
    // console.log(editedExpenseId);
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expanseData);
    } else {
      expensesCtx.addExpense(expanseData);
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpanseForm
        onCancle={cancleHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        deafultValues={selectedExpanse}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButtons
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpanseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpanses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
