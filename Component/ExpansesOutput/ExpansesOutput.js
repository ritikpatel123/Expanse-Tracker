import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ExpansesList from './ExpansesList'
import ExpansesSummary from './ExpansesSummary'
import { GlobalStyles } from '../../constants/styles'


const ExpansesOutput = ({expanses,expansesPeriod,fallback}) => {
  let content=<Text style={styles.content}>{fallback}</Text>

  if(expanses.length>0) {
    content= <ExpansesList expanses={expanses}/>;
  }
  
  return (
    <View style={styles.container}>
        <ExpansesSummary  expanses={expanses} periodName={expansesPeriod}/>
         {content}
    </View>
  )
}

export default ExpansesOutput
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,


    },
    content:{
      color:'white',
      fontSize:16,
      textAlign:'center',
    }
})