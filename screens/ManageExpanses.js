import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButtons from "../Component/UI/IconButtons";
import { GlobalStyles } from "../constants/styles";
import Button from "../Component/UI/Button";
import { ExpenseContext } from "../store/expanses-context";
import ExpanseForm from "../Component/ManageExpanse/ExpanseForm.js";
import { storeExpanse, updateExpense, deleteExpense } from "../util/http.js";
import LoadingOverlay from "../Component/UI/LoadingOverlay.js";
import ErrorOverlay from "../Component/UI/ErrorOverlay.js";

const ManageExpanses = ({ route, navigation }) => {
  const [isUpdating, SetIsUpdating] = useState(false);
  const [error, setError] = useState();
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

  async function deleteExpanseHandler() {
    try {
      expensesCtx.deleteExpense(editedExpenseId);
      SetIsUpdating(true);
      await deleteExpense(editedExpenseId);
      SetIsUpdating(false);
      navigation.goBack();
    } catch (error) {
      setError("unable to delete the item try again!");
    }
  }

  function cancleHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expanseData) {
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expanseData);
        SetIsUpdating(true);
        await updateExpense(editedExpenseId, expanseData);
        SetIsUpdating(false);
      } else {
        SetIsUpdating(true);
        const id = await storeExpanse(expanseData);

        expensesCtx.addExpense({ ...expanseData, id: id });
        navigation.goBack();
      }
    } catch (error) {
      setError("Could not save data try again later ");
      SetIsUpdating(false);
    }
  }

  const errorHandle = () => { 
    setError(null);
  };

  if (error && !isUpdating) {
    <ErrorOverlay message={error} onConfirm={errorHandle} />;
  }

  if (isUpdating) {
    return <LoadingOverlay />;
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
