import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {Ionicons } from '@expo/vector-icons';

const IconButtons = ({icon,size,color,onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
        <View style={styles.buttonContainer}>
            <Ionicons size={size} color={color} name={icon}/>
        </View>
    </Pressable>
  )
}

export default IconButtons
const styles=StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        marginHorizontal:16
    },
    pressed:{
        opacity:0.75
    }
})