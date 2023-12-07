import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { GetFormatedDate } from '../../util/Date'
import {useNavigation} from '@react-navigation/native'


const ExpenseItem = ({id,description,amount,date}) => {
    const navigation=useNavigation();
    
    const expansePressHandler=()=>{
        // console.log(key," ",description," ",amount," ",date)
    navigation.navigate('manageExpanses',{
       
        expenseId:id,
        
    })

    };
  return (
    <Pressable onPress={expansePressHandler} style={({pressed})=>pressed && Styles.pressed}>
        <View style={Styles.expenseItem}>
            <View >
                <Text style={[Styles.textBase,Styles.description]}>{description}</Text>
                <Text style={Styles.textBase}>{GetFormatedDate(date)}</Text>
            </View>
            <View style={Styles.priceConatiner}>
            <Text style={Styles.amount}>{amount}</Text>
            </View>
        </View>
    </Pressable>
  )
}

export default ExpenseItem

const Styles=StyleSheet.create({
    pressed:{
     opacity:0.75
    },
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowRadius:4,
        textShadowOffset:{width:1,height:1},
        shadowOpacity:0.4
    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',
    },
    priceConatiner:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:80 
    },
    amount:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold',

    }
})