//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

const ErrorOverlay = ({message,onConfirm}) => {
    return (
        <View style={styles.container}>
        <Text style={[styles.text,styles.text]}> An Error occoured! </Text>
        <Text style={[styles.text]}>{message}</Text>
        <Button  onPress={onConfirm}>Okay</Button>
        </View> 

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,
       
    },
    text: {
        color:'white',
        textAlign:'center',
        marginBottom:8
    },
     title:{
        fontSize:20,
        fontWeight:'bold',
     },
     

});

//make this component available to the app
export default ErrorOverlay;
