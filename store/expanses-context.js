import { createContext, useReducer } from "react";
const DUMMY_EXPENSE=[
    {
        id:'e1',
        description:'A pair of shoes',
        amount:2300,
        date:new Date('2023-10-05')
    },
    {
        id:'e2',
        description:'A pair of trouser',
        amount:1200,
        date:new Date('2023-11-05')
    },
    {
        id:'e3',
        description:'bananas',
        amount:100,
        date:new Date('2023-10-03')
    },
    {
        id:'e4',
        description:'A pair of shoes',
        amount:300,
        date:new Date('2023-11-05')
    },
    {
        id:'e5',
        description:'A watch',
        amount:5000,
        date:new Date('2023-11-28')
    },
    {
        id:'e3',
        description:'bananas',
        amount:100,
        date:new Date('2023-11-23')
    },
    {
        id:'e4',
        description:'A pair of shoes',
        amount:300,
        date:new Date('2023-11-25')
    },
    {
        id:'e5',
        description:'A watch',
        amount:5000,
        date:new Date('2023-11-20')
    },

]

export const ExpenseContext=createContext({
    expenses:[],
    addExpense:({description,amount,date})=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id,{description,amount,date})=>{},
});
function ExpensesReducer(state,action) {
    switch(action.type) {
        case 'ADD':
            const id=new Date().toString()+Math.random().toString();
            return [{...action.payload,id:id},...state]
        case 'UPDATE':
            const updatableExpanseIndex=state.findIndex(
                (expense)=>expense.id===action.payload.id
            )
            const updatableExpense=state[updatableExpanseIndex];
            const updatedItem={...updatableExpense,...action.payload.data}
            const UpdatedExpenses=[...state]
            UpdatedExpenses[updatableExpanseIndex]=updatedItem
            return UpdatedExpenses;   

        case 'DELETE':
            return state.filter((expense)=> expense.id!== action.payload)

        default:
            return state;    

    }
}
function ExpenseContextProvider({children}){
    const [expensesState,dispatch]=useReducer(ExpensesReducer,DUMMY_EXPENSE)
    function addExpense(expenseData){
        dispatch({type:'ADD',payload:expenseData})

    }
    function deleteExpense(id){
        dispatch({type:'DELETE',payload:id})

    }
    function updateExpense(id,expenseData){
        dispatch({type:'UPDATE',payload:{id:id,data:expenseData}})

    }
    const value={
        expenses:expensesState,
        addExpense:addExpense,
        deleteExpense:deleteExpense,
        updateExpense:updateExpense,
    }
    return(
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    )
}
export default  ExpenseContextProvider;