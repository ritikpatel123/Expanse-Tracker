import React, { useState ,useContext} from 'react'
import { Text,StyleSheet, View } from 'react-native'
import ExpansesOutput from '../Component/ExpansesOutput/ExpansesOutput'
import { ExpenseContext } from '../store/expanses-context'
import { GetDaysMinusDays } from '../util/Date'
const Recent = () => {
  
    // const [recentExpanseList,setRecentExpanseList]=useState([])
    // const [totalExpanse,setTotalExpance]=useState(0)
    const ExpensesCtx=useContext(ExpenseContext);
    const recentExpenses=ExpensesCtx.expenses.filter((expense)=>{
         const today=new Date();
         const date7DaysAgo=GetDaysMinusDays(today,7);
         return expense.date > date7DaysAgo;
    })

  return (
    <ExpansesOutput 
    expanses={recentExpenses} 
    expansesPeriod={"Last 7 days"}
    fallback={"no registered! expenses found for last 7 days"}/>
  )
}

export default Recent
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     
    },
  });
  