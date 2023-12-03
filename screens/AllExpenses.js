import React,{useContext} from 'react'
import { Text,View ,StyleSheet} from 'react-native'
import ExpansesOutput from '../Component/ExpansesOutput/ExpansesOutput'
import { ExpenseContext } from '../store/expanses-context'

const AllExpences = () => {
  const ExpensesCtx=useContext(ExpenseContext);
  return (
    <ExpansesOutput
    expanses={ExpensesCtx.expenses}
    expansesPeriod={"Total"}
    fallback={"no expenses registered!!"}/>
  )
}

export default AllExpences
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  