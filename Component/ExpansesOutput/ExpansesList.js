import React from 'react'
import { FlatList, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'

function renderExpanseItem(itemData){
  //  console.log("sdvnf",itemData.item)
 return <ExpenseItem {...itemData.item}/>
}

const ExpansesList = ({expanses}) => {
  return <FlatList 
  data={expanses}
  renderItem={renderExpanseItem}
  keyExtractor={(item)=>item.id}
  />
}

export default ExpansesList