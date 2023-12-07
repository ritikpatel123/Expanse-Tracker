import React, { useState ,useContext, useEffect} from 'react'
import { Text,StyleSheet, View } from 'react-native'
import ExpansesOutput from '../Component/ExpansesOutput/ExpansesOutput'
import { ExpenseContext } from '../store/expanses-context'
import { GetDaysMinusDays } from '../util/Date'
import { fetchExpanse } from '../util/http'
import LoadingOverlay from '../Component/UI/LoadingOverlay';
const Recent = () => {
  const [isFetching,setisFetching]=useState(false);
  const ExpensesCtx=useContext(ExpenseContext);


    useEffect(()=>{ 
      async function getExpanse(){
      setisFetching(true)
      const response= await fetchExpanse();
      setisFetching(false)
      ExpensesCtx.setExpanse(response);

    }  
      getExpanse();
    },[])
    if(isFetching) {
      return <LoadingOverlay/>
    }

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
  