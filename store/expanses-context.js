import { createContext, useReducer } from "react";
export const ExpenseContext=createContext({
    expenses:[],
    addExpense:({description,amount,date})=>{},
    deleteExpense:(id)=>{},
    setExpanse:(expanse)=>{},
    updateExpense:(id,{description,amount,date})=>{},
});
function ExpensesReducer(state,action) {
    switch(action.type) {
        case 'ADD':
            console.log("sdcs",[action.payload,...state]);
            return [action.payload,...state]
        case 'UPDATE':
            const updatableExpanseIndex=state.findIndex(
                (expense)=>expense.id===action.payload.id
            )
            const updatableExpense=state[updatableExpanseIndex];
            const updatedItem={...updatableExpense,...action.payload.data}
            const UpdatedExpenses=[...state]
            UpdatedExpenses[updatableExpanseIndex]=updatedItem
            return UpdatedExpenses;   
        case 'GET': 
        const inverted=action.payload.reverse();
         return inverted;
        case 'DELETE':
            return state.filter((expense)=> expense.id!== action.payload)

        default:
            return state;
    }
}
function ExpenseContextProvider({children}){
    const [expensesState,dispatch]=useReducer(ExpensesReducer,[])
    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData})

    }
    function deleteExpense(id){
        dispatch({type:'DELETE',payload:id})

    }
    function setExpanse(expanse) {
        dispatch({type:'GET',payload:expanse});
    }
    function updateExpense(id,expenseData){
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}})

    }
    const value={
        expenses:expensesState,
        setExpanse:setExpanse,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,
    }
    return(
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    )
}
export default  ExpenseContextProvider;